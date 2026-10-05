from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "City Coolies Backend"
    app_env: str = "development"
    api_host: str = "127.0.0.1"
    api_port: int = 8000
    frontend_origins: str = (
        "http://localhost:3000,"
        "https://citycoolies.com,"
        "https://www.citycoolies.com"
    )

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    @property
    def cors_origins(self) -> list[str]:
        return [
            origin.strip()
            for origin in self.frontend_origins.split(",")
            if origin.strip()
        ]


@lru_cache
def get_settings() -> Settings:
    return Settings()