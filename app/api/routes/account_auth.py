"""City Coolies customer account API. Separate from legacy OTP transport."""
import hashlib
import hmac
import secrets
import sqlite3
import time
from email.message import EmailMessage

from fastapi import APIRouter, HTTPException, Request, Response
from pydantic import BaseModel, field_validator

from app.api.routes import auth as legacy
from app.core.config import get_settings
from app.core.security import hash_otp, generate_challenge_id, generate_otp, verify_otp_hash

router = APIRouter(prefix='/auth', tags=['Customer accounts'])

class Identity(BaseModel):
    channel: str
    identifier: str

    @field_validator('channel')
    @classmethod
    def valid_channel(cls, value):
        if value not in ('email', 'phone'):
            raise ValueError('Channel must be email or phone')
        return value

class Credentials(Identity):
    pin: str

    @field_validator('pin')
    @classmethod
    def valid_pin(cls, value):
        if not isinstance(value, str) or len(value) != 4 or not value.isascii() or not value.isdigit():
            raise ValueError('PIN must be exactly 4 digits')
        return value

class RegisterRequest(Credentials):
    confirm_pin: str

class ResetRequest(RegisterRequest):
    pass

class VerifyRequest(BaseModel):
    challenge_id: str
    otp: str

    @field_validator('otp')
    @classmethod
    def valid_otp(cls, value):
        if not isinstance(value, str) or len(value) != 6 or not value.isascii() or not value.isdigit():
            raise ValueError('OTP must be 6 digits')
        return value

def now():
    return int(time.time())

def normalize(payload):
    return legacy.normalize_identifier(payload.channel, payload.identifier)

def hash_pin(pin):
    salt = secrets.token_bytes(16)
    secret = get_settings().auth_secret.encode()
    if len(secret) < 16:
        raise RuntimeError('AUTH_SECRET must be configured with a strong random value')
    digest = hashlib.pbkdf2_hmac('sha256', pin.encode() + secret, salt, 600000)
    return 'pbkdf2_sha256$600000$' + salt.hex() + '$' + digest.hex()

def verify_pin(pin, stored):
    try:
        method, iterations, salt_hex, digest_hex = stored.split('$')
        if method != 'pbkdf2_sha256' or int(iterations) < 100000:
            return False
        expected = bytes.fromhex(digest_hex)
        actual = hashlib.pbkdf2_hmac('sha256', pin.encode() + get_settings().auth_secret.encode(), bytes.fromhex(salt_hex), int(iterations))
        return hmac.compare_digest(actual, expected)
    except (ValueError, TypeError):
        return False

def db():
    return legacy.get_connection()

def init_db():
    with db() as con:
        con.execute('''CREATE TABLE IF NOT EXISTS customers (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            channel TEXT NOT NULL, identifier TEXT NOT NULL,
            password_hash TEXT NOT NULL, verified INTEGER NOT NULL DEFAULT 1,
            active INTEGER NOT NULL DEFAULT 1,
            failed_login_attempts INTEGER NOT NULL DEFAULT 0,
            locked_until INTEGER NOT NULL DEFAULT 0,
            session_version INTEGER NOT NULL DEFAULT 1,
            created_at INTEGER NOT NULL, updated_at INTEGER NOT NULL,
            last_login_at INTEGER, UNIQUE(channel, identifier))''')
        columns = {row[1] for row in con.execute('PRAGMA table_info(otp_challenges)')}
        if 'purpose' not in columns:
            con.execute("ALTER TABLE otp_challenges ADD COLUMN purpose TEXT NOT NULL DEFAULT 'legacy'")
        if 'pending_password_hash' not in columns:
            con.execute('ALTER TABLE otp_challenges ADD COLUMN pending_password_hash TEXT')
        con.execute('''CREATE TABLE IF NOT EXISTS customer_sessions (
            token_hash TEXT PRIMARY KEY, customer_id INTEGER NOT NULL,
            session_version INTEGER NOT NULL, expires_at INTEGER NOT NULL,
            created_at INTEGER NOT NULL)''')
        con.execute('CREATE INDEX IF NOT EXISTS idx_customer_sessions_user ON customer_sessions(customer_id)')
        con.execute('''CREATE TABLE IF NOT EXISTS auth_request_limits (
            rate_key TEXT PRIMARY KEY, attempts INTEGER NOT NULL,
            reset_at INTEGER NOT NULL)''')
        con.commit()

def limit(key, maximum=8, window=900):
    t = now()
    with db() as con:
        con.execute('BEGIN IMMEDIATE')
        row = con.execute('SELECT attempts,reset_at FROM auth_request_limits WHERE rate_key=?', (key,)).fetchone()
        if row and row['reset_at'] > t and row['attempts'] >= maximum:
            raise HTTPException(429, 'Too many requests. Try again later.')
        if not row or row['reset_at'] <= t:
            con.execute('INSERT INTO auth_request_limits(rate_key,attempts,reset_at) VALUES(?,1,?) ON CONFLICT(rate_key) DO UPDATE SET attempts=1,reset_at=excluded.reset_at', (key,t+window))
        else:
            con.execute('UPDATE auth_request_limits SET attempts=attempts+1 WHERE rate_key=?', (key,))
        con.commit()

def customer(con, channel, identifier):
    return con.execute('SELECT * FROM customers WHERE channel=? AND identifier=?', (channel, identifier)).fetchone()

def send_notice(channel, identifier, subject, message):
    if channel != 'email':
        return False
    settings = get_settings()
    if not settings.gmail_smtp_user or not settings.gmail_app_password:
        return False
    email = EmailMessage()
    email['Subject'] = subject
    email['From'] = settings.gmail_smtp_user
    email['To'] = identifier
    email.set_content(message)
    with legacy._smtp_lock:
        try:
            legacy._get_smtp_connection().send_message(email)
            return True
        except Exception:
            legacy._close_smtp_connection()
            return False

def start_challenge(channel, identifier, purpose, password_hash):
    settings = get_settings()
    t = now()
    with db() as con:
        recent = con.execute('SELECT resend_after FROM otp_challenges WHERE channel=? AND identifier=? AND purpose=? AND expires_at>? ORDER BY created_at DESC LIMIT 1', (channel,identifier,purpose,t)).fetchone()
        if recent and recent['resend_after'] > t:
            raise HTTPException(429, 'Please wait before requesting another OTP')
    challenge_id = generate_challenge_id()
    otp_hash = None
    if channel == 'email':
        otp = generate_otp()
        otp_hash = hash_otp(challenge_id, otp)
        legacy.send_email_otp(identifier, otp)
    else:
        legacy.send_phone_otp(identifier)
    with db() as con:
        con.execute('DELETE FROM otp_challenges WHERE channel=? AND identifier=? AND purpose=?', (channel,identifier,purpose))
        con.execute('''INSERT INTO otp_challenges
            (challenge_id,channel,identifier,email_otp_hash,expires_at,resend_after,attempts,created_at,purpose,pending_password_hash)
            VALUES(?,?,?,?,?,?,0,?,?,?)''', (challenge_id,channel,identifier,otp_hash,t+settings.otp_ttl_seconds,t+settings.otp_resend_seconds,t,purpose,password_hash))
        con.commit()
    return {'sent': True, 'challenge_id': challenge_id, 'expires_in': settings.otp_ttl_seconds, 'resend_after': settings.otp_resend_seconds}

def issue_session(con, row, response):
    settings = get_settings()
    token = secrets.token_urlsafe(48)
    con.execute('INSERT INTO customer_sessions(token_hash,customer_id,session_version,expires_at,created_at) VALUES(?,?,?,?,?)', (hashlib.sha256(token.encode()).hexdigest(),row['id'],row['session_version'],now()+settings.session_days*86400,now()))
    response.set_cookie(settings.session_cookie_name, token, httponly=True, secure=settings.cookie_secure, samesite='lax', max_age=settings.session_days*86400, path='/')
    return {'authenticated': True, 'user': {'channel':row['channel'], 'identifier':('+' if row['channel']=='phone' else '')+row['identifier']}}

def session_user(request):
    token = request.cookies.get(get_settings().session_cookie_name)
    if not token:
        return None
    with db() as con:
        return con.execute('''SELECT c.* FROM customer_sessions s JOIN customers c ON c.id=s.customer_id
            WHERE s.token_hash=? AND s.expires_at>? AND s.session_version=c.session_version AND c.active=1''', (hashlib.sha256(token.encode()).hexdigest(),now())).fetchone()

def require_confirmed(payload):
    if payload.pin != payload.confirm_pin:
        raise HTTPException(422, 'PIN and confirmation do not match')
    return normalize(payload)

@router.post('/register/request')
def register_request(payload: RegisterRequest, request: Request):
    identifier = require_confirmed(payload)
    limit('reg:'+payload.channel+':'+identifier,5,3600)
    with db() as con:
        if customer(con,payload.channel,identifier):
            raise HTTPException(409, 'Account already exists. Please sign in.')
    return start_challenge(payload.channel,identifier,'register',hash_pin(payload.pin))

@router.post('/register/verify')
def register_verify(payload: VerifyRequest, response: Response):
    return finish_challenge(payload,response,'register')

@router.post('/password-reset/request')
def reset_request(payload: ResetRequest):
    identifier = require_confirmed(payload)
    limit('reset:'+payload.channel+':'+identifier,5,3600)
    with db() as con:
        if not customer(con,payload.channel,identifier):
            raise HTTPException(404, 'Account not found')
    return start_challenge(payload.channel,identifier,'reset',hash_pin(payload.pin))

@router.post('/password-reset/verify')
def reset_verify(payload: VerifyRequest, response: Response):
    return finish_challenge(payload,response,'reset')

def finish_challenge(payload, response, purpose):
    t = now()
    with db() as con:
        con.execute('BEGIN IMMEDIATE')
        challenge = con.execute('SELECT * FROM otp_challenges WHERE challenge_id=? AND purpose=? AND expires_at>?', (payload.challenge_id,purpose,t)).fetchone()
        if challenge is None:
            raise HTTPException(400,'Invalid or expired OTP request')
        if challenge['attempts'] >= get_settings().otp_max_attempts:
            raise HTTPException(429,'Too many OTP attempts')
        verified = legacy.verify_phone_otp(challenge['identifier'],payload.otp) if challenge['channel']=='phone' else bool(challenge['email_otp_hash']) and verify_otp_hash(payload.challenge_id,payload.otp,challenge['email_otp_hash'])
        if not verified:
            con.execute('UPDATE otp_challenges SET attempts=attempts+1 WHERE challenge_id=?',(payload.challenge_id,))
            con.commit()
            raise HTTPException(400,'Wrong OTP')
        if purpose == 'register':
            if customer(con,challenge['channel'],challenge['identifier']):
                raise HTTPException(409,'Account already exists')
            con.execute('INSERT INTO customers(channel,identifier,password_hash,created_at,updated_at) VALUES(?,?,?,?,?)',(challenge['channel'],challenge['identifier'],challenge['pending_password_hash'],t,t))
        else:
            existing = customer(con,challenge['channel'],challenge['identifier'])
            if existing is None:
                raise HTTPException(404,'Account not found')
            con.execute('UPDATE customers SET password_hash=?,session_version=session_version+1,failed_login_attempts=0,locked_until=0,updated_at=? WHERE id=?',(challenge['pending_password_hash'],t,existing['id']))
            con.execute('DELETE FROM customer_sessions WHERE customer_id=?',(existing['id'],))
        con.execute('DELETE FROM otp_challenges WHERE challenge_id=?',(payload.challenge_id,))
        row = customer(con,challenge['channel'],challenge['identifier'])
        result = issue_session(con,row,response)
        con.commit()
    subject = 'City Coolies account created' if purpose=='register' else 'City Coolies PIN changed'
    message = 'Your City Coolies account has been created. User ID: '+row['identifier'] if purpose=='register' else 'Your City Coolies account PIN was changed. If this was not you, contact support immediately.'
    result['notification_sent'] = send_notice(row['channel'],row['identifier'],subject,message)
    return result

@router.post('/login')
def login(payload: Credentials, request: Request, response: Response):
    identifier = normalize(payload)
    limit('login:'+payload.channel+':'+identifier,15,900)
    with db() as con:
        con.execute('BEGIN IMMEDIATE')
        row = customer(con,payload.channel,identifier)
        if row is None or not row['active']:
            raise HTTPException(401,'Invalid User ID or PIN')
        if row['locked_until'] > now():
            raise HTTPException(429,'Account temporarily locked. Try again later.')
        if not verify_pin(payload.pin,row['password_hash']):
            attempts = row['failed_login_attempts']+1
            con.execute('UPDATE customers SET failed_login_attempts=?,locked_until=? WHERE id=?',(attempts,now()+900 if attempts>=5 else 0,row['id']))
            con.commit()
            raise HTTPException(401,'Invalid User ID or PIN')
        con.execute('UPDATE customers SET failed_login_attempts=0,locked_until=0,last_login_at=? WHERE id=?',(now(),row['id']))
        result = issue_session(con,row,response)
        con.commit()
        return result

@router.get('/account/status')
def account_status(channel: str, identifier: str, response: Response):
    if channel not in ('email','phone'):
        raise HTTPException(422,'Invalid channel')

    normalized = legacy.normalize_identifier(channel, identifier)

    with db() as con:
        exists = customer(con, channel, normalized) is not None

    # This endpoint decides whether the UI opens Create Account or Sign In.
    # Never allow a browser/proxy to reuse an old answer.
    response.headers['Cache-Control'] = 'no-store, no-cache, must-revalidate, max-age=0'
    response.headers['Pragma'] = 'no-cache'
    response.headers['Expires'] = '0'

    display_user_id = (
        f'+{normalized}'
        if channel == 'phone'
        else normalized
    )

    return {
        'exists': exists,
        'channel': channel,
        'user_id': display_user_id,
        'message': (
            'Account already exists. Please sign in.'
            if exists
            else 'No account exists for this User ID.'
        ),
    }

@router.get('/account/me')
def account_me(request: Request):
    row = session_user(request)
    if row is None:
        raise HTTPException(401,'Not authenticated')
    return {'authenticated':True,'user':{'channel':row['channel'],'identifier':('+' if row['channel']=='phone' else '')+row['identifier']}}

@router.post('/account/logout')
def account_logout(request: Request, response: Response):
    token = request.cookies.get(get_settings().session_cookie_name)
    if token:
        with db() as con:
            con.execute('DELETE FROM customer_sessions WHERE token_hash=?',(hashlib.sha256(token.encode()).hexdigest(),))
            con.commit()
    response.delete_cookie(get_settings().session_cookie_name,path='/',secure=get_settings().cookie_secure,samesite='lax')
    return {'logged_out':True}
