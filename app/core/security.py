import base64
import hashlib
import hmac
import json
import secrets
import time

from app.core.config import get_settings


def generate_otp() -> str:
    return f"{secrets.randbelow(1_000_000):06d}"


def generate_challenge_id() -> str:
    return secrets.token_urlsafe(32)


def hash_otp(
    challenge_id: str,
    otp: str,
) -> str:
    settings = get_settings()

    if not settings.auth_secret:
        raise RuntimeError(
            "AUTH_SECRET is not configured."
        )

    message = f"{challenge_id}:{otp}".encode(
        "utf-8"
    )

    digest = hmac.new(
        settings.auth_secret.encode("utf-8"),
        message,
        hashlib.sha256,
    ).hexdigest()

    return digest


def verify_otp_hash(
    challenge_id: str,
    otp: str,
    stored_hash: str,
) -> bool:
    candidate = hash_otp(
        challenge_id,
        otp,
    )

    return hmac.compare_digest(
        candidate,
        stored_hash,
    )


def create_session_token(
    channel: str,
    identifier: str,
) -> str:
    settings = get_settings()

    if not settings.auth_secret:
        raise RuntimeError(
            "AUTH_SECRET is not configured."
        )

    payload = {
        "channel": channel,
        "identifier": identifier,
        "iat": int(time.time()),
        "nonce": secrets.token_urlsafe(16),
    }

    payload_json = json.dumps(
        payload,
        separators=(",", ":"),
        sort_keys=True,
    ).encode("utf-8")

    encoded_payload = base64.urlsafe_b64encode(
        payload_json
    ).decode("ascii").rstrip("=")

    signature = hmac.new(
        settings.auth_secret.encode("utf-8"),
        encoded_payload.encode("ascii"),
        hashlib.sha256,
    ).hexdigest()

    return f"{encoded_payload}.{signature}"


def validate_session_token(
    token: str,
) -> dict[str, str] | None:
    settings = get_settings()

    if not settings.auth_secret:
        return None

    try:
        encoded_payload, signature = token.rsplit(
            ".",
            1,
        )
    except ValueError:
        return None

    expected_signature = hmac.new(
        settings.auth_secret.encode("utf-8"),
        encoded_payload.encode("ascii"),
        hashlib.sha256,
    ).hexdigest()

    if not hmac.compare_digest(
        signature,
        expected_signature,
    ):
        return None

    padding = "=" * (
        (-len(encoded_payload)) % 4
    )

    try:
        payload_json = base64.urlsafe_b64decode(
            encoded_payload + padding
        )

        payload = json.loads(
            payload_json.decode("utf-8")
        )

        issued_at = int(payload["iat"])
        channel = str(payload["channel"])
        identifier = str(
            payload["identifier"]
        )
    except (
        ValueError,
        TypeError,
        KeyError,
        json.JSONDecodeError,
    ):
        return None

    max_age = (
        settings.session_days
        * 24
        * 60
        * 60
    )

    if int(time.time()) - issued_at > max_age:
        return None

    return {
        "channel": channel,
        "identifier": identifier,
    }