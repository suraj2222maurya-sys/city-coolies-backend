import json
import re
import smtplib
import threading
import sqlite3
import time
import urllib.error
import urllib.parse
import urllib.request
from email.message import EmailMessage
from pathlib import Path

from fastapi import (
    APIRouter,
    HTTPException,
    Request,
    Response,
    status,
)
from pydantic import BaseModel, field_validator

from app.core.config import get_settings
from app.core.security import (
    create_session_token,
    generate_challenge_id,
    generate_otp,
    hash_otp,
    validate_session_token,
    verify_otp_hash,
)


router = APIRouter(
    prefix="/auth",
    tags=["Authentication"],
)


class OtpRequestPayload(BaseModel):
    channel: str
    identifier: str

    @field_validator("channel")
    @classmethod
    def validate_channel(
        cls,
        value: str,
    ) -> str:
        normalized = value.strip().lower()

        if normalized not in {
            "phone",
            "email",
        }:
            raise ValueError(
                "Channel must be phone or email."
            )

        return normalized

    @field_validator("identifier")
    @classmethod
    def validate_identifier(
        cls,
        value: str,
    ) -> str:
        normalized = value.strip()

        if not normalized:
            raise ValueError(
                "Identifier is required."
            )

        return normalized


class OtpVerifyPayload(BaseModel):
    challenge_id: str
    otp: str

    @field_validator("challenge_id")
    @classmethod
    def validate_challenge_id(
        cls,
        value: str,
    ) -> str:
        normalized = value.strip()

        if not normalized:
            raise ValueError(
                "Challenge ID is required."
            )

        return normalized

    @field_validator("otp")
    @classmethod
    def validate_otp(
        cls,
        value: str,
    ) -> str:
        normalized = value.strip()

        if not re.fullmatch(
            r"\d{6}",
            normalized,
        ):
            raise ValueError(
                "OTP must contain exactly 6 digits."
            )

        return normalized


class OtpResendPayload(BaseModel):
    challenge_id: str


def get_connection() -> sqlite3.Connection:
    settings = get_settings()

    database_path = Path(
        settings.auth_database_path
    )

    database_path.parent.mkdir(
        parents=True,
        exist_ok=True,
    )

    connection = sqlite3.connect(
        database_path,
        timeout=10,
    )

    connection.row_factory = sqlite3.Row

    return connection


def initialize_database() -> None:
    with get_connection() as connection:
        connection.execute(
            """
            CREATE TABLE IF NOT EXISTS otp_challenges (
                challenge_id TEXT PRIMARY KEY,
                channel TEXT NOT NULL,
                identifier TEXT NOT NULL,
                email_otp_hash TEXT,
                expires_at INTEGER NOT NULL,
                resend_after INTEGER NOT NULL,
                attempts INTEGER NOT NULL DEFAULT 0,
                created_at INTEGER NOT NULL
            )
            """
        )

        connection.execute(
            """
            CREATE INDEX IF NOT EXISTS
            idx_otp_identifier
            ON otp_challenges (
                channel,
                identifier
            )
            """
        )

        connection.commit()


initialize_database()


def normalize_phone(
    value: str,
) -> str:
    digits = re.sub(
        r"\D",
        "",
        value,
    )

    if (
        digits.startswith("91")
        and len(digits) == 12
    ):
        digits = digits[2:]

    if not re.fullmatch(
        r"[6-9]\d{9}",
        digits,
    ):
        raise HTTPException(
            status_code=(
                status.HTTP_422_UNPROCESSABLE_ENTITY
            ),
            detail=(
                "Enter a valid 10-digit "
                "Indian mobile number."
            ),
        )

    return f"91{digits}"


def normalize_email(
    value: str,
) -> str:
    email = value.strip().lower()

    if not re.fullmatch(
        r"^[^@\s]+@[^@\s]+\.[^@\s]+$",
        email,
    ):
        raise HTTPException(
            status_code=(
                status.HTTP_422_UNPROCESSABLE_ENTITY
            ),
            detail="Enter a valid email address.",
        )

    return email


def normalize_identifier(
    channel: str,
    identifier: str,
) -> str:
    if channel == "phone":
        return normalize_phone(identifier)

    return normalize_email(identifier)


def cleanup_expired_challenges() -> None:
    now = int(time.time())

    with get_connection() as connection:
        connection.execute(
            """
            DELETE FROM otp_challenges
            WHERE expires_at <= ?
            """,
            (now,),
        )

        connection.commit()


def fetch_challenge(
    challenge_id: str,
) -> sqlite3.Row | None:
    cleanup_expired_challenges()

    with get_connection() as connection:
        row = connection.execute(
            """
            SELECT
                challenge_id,
                channel,
                identifier,
                email_otp_hash,
                expires_at,
                resend_after,
                attempts
            FROM otp_challenges
            WHERE challenge_id = ?
            """,
            (challenge_id,),
        ).fetchone()

    return row


def provider_request(
    request: urllib.request.Request,
) -> dict:
    try:
        with urllib.request.urlopen(
            request,
            timeout=15,
        ) as response:
            raw = response.read().decode(
                "utf-8",
                errors="replace",
            )

    except urllib.error.HTTPError as exc:
        raw = exc.read().decode(
            "utf-8",
            errors="replace",
        )

        try:
            payload = json.loads(raw)
        except json.JSONDecodeError:
            payload = {}

        detail = (
            payload.get("message")
            or payload.get("detail")
            or "OTP provider request failed."
        )

        raise HTTPException(
            status_code=(
                status.HTTP_502_BAD_GATEWAY
            ),
            detail=str(detail),
        ) from exc

    except urllib.error.URLError as exc:
        raise HTTPException(
            status_code=(
                status.HTTP_503_SERVICE_UNAVAILABLE
            ),
            detail=(
                "OTP provider is temporarily "
                "unavailable."
            ),
        ) from exc

    try:
        return json.loads(raw)
    except json.JSONDecodeError as exc:
        raise HTTPException(
            status_code=(
                status.HTTP_502_BAD_GATEWAY
            ),
            detail=(
                "OTP provider returned an "
                "invalid response."
            ),
        ) from exc


def send_phone_otp(
    mobile: str,
) -> None:
    settings = get_settings()

    if not settings.msg91_auth_key:
        raise HTTPException(
            status_code=(
                status.HTTP_503_SERVICE_UNAVAILABLE
            ),
            detail=(
                "MSG91_AUTH_KEY is not configured."
            ),
        )

    if not settings.msg91_template_id:
        raise HTTPException(
            status_code=(
                status.HTTP_503_SERVICE_UNAVAILABLE
            ),
            detail=(
                "MSG91_TEMPLATE_ID is not configured."
            ),
        )

    expiry_minutes = max(
        1,
        settings.otp_ttl_seconds // 60,
    )

    query = urllib.parse.urlencode(
        {
            "template_id": (
                settings.msg91_template_id
            ),
            "mobile": mobile,
            "otp_length": 6,
            "otp_expiry": expiry_minutes,
        }
    )

    url = (
        "https://control.msg91.com/"
        f"api/v5/otp?{query}"
    )

    request = urllib.request.Request(
        url=url,
        method="POST",
        data=b"{}",
        headers={
            "accept": "application/json",
            "content-type": "application/json",
            "authkey": settings.msg91_auth_key,
        },
    )

    result = provider_request(request)

    if (
        str(result.get("type", "")).lower()
        != "success"
    ):
        raise HTTPException(
            status_code=(
                status.HTTP_502_BAD_GATEWAY
            ),
            detail=str(
                result.get("message")
                or "Unable to send phone OTP."
            ),
        )


def verify_phone_otp(
    mobile: str,
    otp: str,
) -> bool:
    settings = get_settings()

    query = urllib.parse.urlencode(
        {
            "mobile": mobile,
            "otp": otp,
        }
    )

    url = (
        "https://control.msg91.com/"
        f"api/v5/otp/verify?{query}"
    )

    request = urllib.request.Request(
        url=url,
        method="GET",
        headers={
            "accept": "application/json",
            "authkey": settings.msg91_auth_key,
        },
    )

    result = provider_request(request)

    result_type = str(
        result.get("type", "")
    ).lower()

    message = str(
        result.get("message", "")
    ).lower()

    if result_type == "success":
        return True

    if message == "otp verified success":
        return True

    return False


def resend_phone_otp(
    mobile: str,
) -> None:
    settings = get_settings()

    query = urllib.parse.urlencode(
        {
            "mobile": mobile,
            "retrytype": "text",
        }
    )

    url = (
        "https://control.msg91.com/"
        f"api/v5/otp/retry?{query}"
    )

    request = urllib.request.Request(
        url=url,
        method="POST",
        data=b"{}",
        headers={
            "accept": "application/json",
            "content-type": "application/json",
            "authkey": settings.msg91_auth_key,
        },
    )

    result = provider_request(request)

    if (
        str(result.get("type", "")).lower()
        != "success"
    ):
        raise HTTPException(
            status_code=(
                status.HTTP_502_BAD_GATEWAY
            ),
            detail=str(
                result.get("message")
                or "Unable to resend phone OTP."
            ),
        )


# EMAIL SMTP CONNECTION POOL

_smtp_lock = threading.Lock()
_smtp_server: smtplib.SMTP | None = None
_smtp_connected_at = 0.0

SMTP_IDLE_RECONNECT_SECONDS = 240


def _close_smtp_connection() -> None:
    global _smtp_server
    global _smtp_connected_at

    server = _smtp_server

    _smtp_server = None
    _smtp_connected_at = 0.0

    if server is None:
        return

    try:
        server.quit()
    except (smtplib.SMTPException, OSError):
        try:
            server.close()
        except OSError:
            pass


def _create_smtp_connection() -> smtplib.SMTP:
    global _smtp_connected_at

    settings = get_settings()

    server = smtplib.SMTP(
        "smtp.gmail.com",
        587,
        timeout=10,
    )

    server.ehlo()
    server.starttls()
    server.ehlo()

    server.login(
        settings.gmail_smtp_user,
        settings.gmail_app_password,
    )

    _smtp_connected_at = time.monotonic()

    return server


def _get_smtp_connection() -> smtplib.SMTP:
    global _smtp_server

    should_reconnect = (
        _smtp_server is None
        or (
            time.monotonic() - _smtp_connected_at
            >= SMTP_IDLE_RECONNECT_SECONDS
        )
    )

    if not should_reconnect and _smtp_server is not None:
        try:
            code, _ = _smtp_server.noop()

            if code != 250:
                should_reconnect = True

        except (smtplib.SMTPException, OSError):
            should_reconnect = True

    if should_reconnect:
        _close_smtp_connection()
        _smtp_server = _create_smtp_connection()

    if _smtp_server is None:
        raise smtplib.SMTPServerDisconnected(
            "SMTP connection is unavailable."
        )

    return _smtp_server


def warm_email_connection() -> bool:
    settings = get_settings()

    if (
        not settings.gmail_smtp_user
        or not settings.gmail_app_password
    ):
        return False

    with _smtp_lock:
        try:
            _get_smtp_connection()
            return True
        except (smtplib.SMTPException, OSError):
            _close_smtp_connection()
            return False


def send_email_otp(
    email: str,
    otp: str,
) -> None:
    settings = get_settings()

    if not settings.gmail_smtp_user:
        raise HTTPException(
            status_code=(
                status.HTTP_503_SERVICE_UNAVAILABLE
            ),
            detail=(
                "GMAIL_SMTP_USER is not configured."
            ),
        )

    if not settings.gmail_app_password:
        raise HTTPException(
            status_code=(
                status.HTTP_503_SERVICE_UNAVAILABLE
            ),
            detail=(
                "GMAIL_APP_PASSWORD is not configured."
            ),
        )

    expiry_minutes = max(
        1,
        settings.otp_ttl_seconds // 60,
    )

    message = EmailMessage()

    message["Subject"] = (
        "Your City Coolies verification code"
    )

    message["From"] = settings.gmail_smtp_user
    message["To"] = email

    message.set_content(
        (
            f"Your City Coolies OTP is {otp}.\n\n"
            f"This OTP expires in "
            f"{expiry_minutes} minutes.\n\n"
            "Do not share this OTP with anyone."
        )
    )

    with _smtp_lock:
        for attempt in range(2):
            try:
                server = _get_smtp_connection()
                server.send_message(message)
                return

            except (
                smtplib.SMTPException,
                OSError,
            ) as exc:
                _close_smtp_connection()

                if attempt == 1:
                    raise HTTPException(
                        status_code=(
                            status.HTTP_503_SERVICE_UNAVAILABLE
                        ),
                        detail=(
                            "Unable to send email OTP."
                        ),
                    ) from exc

    raise HTTPException(
        status_code=(
            status.HTTP_503_SERVICE_UNAVAILABLE
        ),
        detail="Unable to send email OTP.",
    )

@router.post("/otp/request")
def request_otp(
    payload: OtpRequestPayload,
) -> dict[str, object]:
    settings = get_settings()

    identifier = normalize_identifier(
        payload.channel,
        payload.identifier,
    )

    now = int(time.time())

    cleanup_expired_challenges()

    with get_connection() as connection:
        existing = connection.execute(
            """
            SELECT resend_after
            FROM otp_challenges
            WHERE channel = ?
              AND identifier = ?
              AND expires_at > ?
            ORDER BY created_at DESC
            LIMIT 1
            """,
            (
                payload.channel,
                identifier,
                now,
            ),
        ).fetchone()

        if (
            existing is not None
            and int(existing["resend_after"]) > now
        ):
            wait_seconds = (
                int(existing["resend_after"])
                - now
            )

            raise HTTPException(
                status_code=(
                    status.HTTP_429_TOO_MANY_REQUESTS
                ),
                detail=(
                    f"Please wait {wait_seconds} "
                    "seconds before requesting "
                    "another OTP."
                ),
            )

    challenge_id = generate_challenge_id()

    email_otp_hash = None

    if payload.channel == "phone":
        send_phone_otp(identifier)

    else:
        otp = generate_otp()

        email_otp_hash = hash_otp(
            challenge_id,
            otp,
        )

        send_email_otp(
            identifier,
            otp,
        )

    expires_at = (
        now + settings.otp_ttl_seconds
    )

    resend_after = (
        now + settings.otp_resend_seconds
    )

    with get_connection() as connection:
        connection.execute(
            """
            INSERT INTO otp_challenges (
                challenge_id,
                channel,
                identifier,
                email_otp_hash,
                expires_at,
                resend_after,
                attempts,
                created_at
            )
            VALUES (?, ?, ?, ?, ?, ?, 0, ?)
            """,
            (
                challenge_id,
                payload.channel,
                identifier,
                email_otp_hash,
                expires_at,
                resend_after,
                now,
            ),
        )

        connection.commit()

    destination = (
        f"+{identifier}"
        if payload.channel == "phone"
        else identifier
    )

    return {
        "challenge_id": challenge_id,
        "sent": True,
        "channel": payload.channel,
        "destination": destination,
        "expires_in": (
            settings.otp_ttl_seconds
        ),
        "resend_after": (
            settings.otp_resend_seconds
        ),
    }


@router.post("/otp/resend")
def resend_otp(
    payload: OtpResendPayload,
) -> dict[str, object]:
    settings = get_settings()

    challenge = fetch_challenge(
        payload.challenge_id
    )

    if challenge is None:
        raise HTTPException(
            status_code=(
                status.HTTP_400_BAD_REQUEST
            ),
            detail="Invalid or expired OTP request.",
        )

    now = int(time.time())

    if int(challenge["resend_after"]) > now:
        wait_seconds = (
            int(challenge["resend_after"])
            - now
        )

        raise HTTPException(
            status_code=(
                status.HTTP_429_TOO_MANY_REQUESTS
            ),
            detail=(
                f"Please wait {wait_seconds} "
                "seconds before resending OTP."
            ),
        )

    channel = str(
        challenge["channel"]
    )

    identifier = str(
        challenge["identifier"]
    )

    new_hash = challenge[
        "email_otp_hash"
    ]

    if channel == "phone":
        resend_phone_otp(identifier)

    else:
        otp = generate_otp()

        new_hash = hash_otp(
            payload.challenge_id,
            otp,
        )

        send_email_otp(
            identifier,
            otp,
        )

    new_expiry = (
        now + settings.otp_ttl_seconds
    )

    new_resend_after = (
        now + settings.otp_resend_seconds
    )

    with get_connection() as connection:
        connection.execute(
            """
            UPDATE otp_challenges
            SET email_otp_hash = ?,
                expires_at = ?,
                resend_after = ?,
                attempts = 0
            WHERE challenge_id = ?
            """,
            (
                new_hash,
                new_expiry,
                new_resend_after,
                payload.challenge_id,
            ),
        )

        connection.commit()

    return {
        "sent": True,
        "expires_in": (
            settings.otp_ttl_seconds
        ),
        "resend_after": (
            settings.otp_resend_seconds
        ),
    }


@router.post("/otp/verify")
def verify_otp(
    payload: OtpVerifyPayload,
    response: Response,
) -> dict[str, object]:
    settings = get_settings()

    challenge = fetch_challenge(
        payload.challenge_id
    )

    if challenge is None:
        raise HTTPException(
            status_code=(
                status.HTTP_400_BAD_REQUEST
            ),
            detail="Invalid or expired OTP request.",
        )

    attempts = int(
        challenge["attempts"]
    )

    if attempts >= settings.otp_max_attempts:
        with get_connection() as connection:
            connection.execute(
                """
                DELETE FROM otp_challenges
                WHERE challenge_id = ?
                """,
                (payload.challenge_id,),
            )

            connection.commit()

        raise HTTPException(
            status_code=(
                status.HTTP_429_TOO_MANY_REQUESTS
            ),
            detail=(
                "Too many wrong OTP attempts. "
                "Request a new OTP."
            ),
        )

    channel = str(
        challenge["channel"]
    )

    identifier = str(
        challenge["identifier"]
    )

    verified = False

    if channel == "phone":
        verified = verify_phone_otp(
            identifier,
            payload.otp,
        )

    else:
        stored_hash = challenge[
            "email_otp_hash"
        ]

        if stored_hash:
            verified = verify_otp_hash(
                payload.challenge_id,
                payload.otp,
                str(stored_hash),
            )

    if not verified:
        new_attempts = attempts + 1

        with get_connection() as connection:
            connection.execute(
                """
                UPDATE otp_challenges
                SET attempts = ?
                WHERE challenge_id = ?
                """,
                (
                    new_attempts,
                    payload.challenge_id,
                ),
            )

            connection.commit()

        if (
            new_attempts
            >= settings.otp_max_attempts
        ):
            with get_connection() as connection:
                connection.execute(
                    """
                    DELETE FROM otp_challenges
                    WHERE challenge_id = ?
                    """,
                    (payload.challenge_id,),
                )

                connection.commit()

            raise HTTPException(
                status_code=(
                    status.HTTP_429_TOO_MANY_REQUESTS
                ),
                detail=(
                    "Too many wrong OTP attempts. "
                    "Request a new OTP."
                ),
            )

        raise HTTPException(
            status_code=(
                status.HTTP_400_BAD_REQUEST
            ),
            detail="Wrong OTP.",
        )

    with get_connection() as connection:
        connection.execute(
            """
            DELETE FROM otp_challenges
            WHERE challenge_id = ?
            """,
            (payload.challenge_id,),
        )

        connection.commit()

    session_token = create_session_token(
        channel,
        identifier,
    )

    response.set_cookie(
        key=settings.session_cookie_name,
        value=session_token,
        httponly=True,
        secure=settings.cookie_secure,
        samesite="lax",
        max_age=(
            settings.session_days
            * 24
            * 60
            * 60
        ),
        path="/",
    )

    destination = (
        f"+{identifier}"
        if channel == "phone"
        else identifier
    )

    return {
        "verified": True,
        "authenticated": True,
        "user": {
            "channel": channel,
            "identifier": destination,
        },
    }


@router.get("/me")
def current_user(
    request: Request,
) -> dict[str, object]:
    settings = get_settings()

    token = request.cookies.get(
        settings.session_cookie_name
    )

    if not token:
        raise HTTPException(
            status_code=(
                status.HTTP_401_UNAUTHORIZED
            ),
            detail="Not authenticated.",
        )

    session = validate_session_token(
        token
    )

    if session is None:
        raise HTTPException(
            status_code=(
                status.HTTP_401_UNAUTHORIZED
            ),
            detail=(
                "Invalid or expired session."
            ),
        )

    identifier = session[
        "identifier"
    ]

    if session["channel"] == "phone":
        identifier = f"+{identifier}"

    return {
        "authenticated": True,
        "user": {
            "channel": session["channel"],
            "identifier": identifier,
        },
    }


@router.post("/logout")
def logout(
    response: Response,
) -> dict[str, bool]:
    settings = get_settings()

    response.delete_cookie(
        key=settings.session_cookie_name,
        path="/",
        secure=settings.cookie_secure,
        samesite="lax",
    )

    return {
        "logged_out": True,
    }