from functools import lru_cache
from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict


BASE_DIR = Path(__file__).resolve().parents[2]


class Settings(BaseSettings):
    app_name: str = "City Coolies API"

    frontend_origins: str = (
        "http://localhost:3000,"
        "http://127.0.0.1:3000"
    )

    auth_secret: str = ""

    session_cookie_name: str = "city_coolies_session"
    session_days: int = 30
    cookie_secure: bool = False

    otp_ttl_seconds: int = 600
    otp_resend_seconds: int = 60
    otp_max_attempts: int = 5

    gmail_smtp_user: str = ""
    gmail_app_password: str = ""

    msg91_auth_key: str = ""
    msg91_template_id: str = ""

    auth_database_path: str = str(
        BASE_DIR / "data" / "auth.db"
    )

    model_config = SettingsConfigDict(
        env_file=str(BASE_DIR / ".env"),
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",
    )

    @property
    def allowed_origins(self) -> list[str]:
        return [
            value.strip()
            for value in self.frontend_origins.split(",")
            if value.strip()
        ]


@lru_cache
def get_settings() -> Settings:
    return Settings()