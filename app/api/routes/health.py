from fastapi import APIRouter

from app.core.config import get_settings

router = APIRouter(tags=["health"])


@router.get("/health")
async def api_health() -> dict[str, str | bool]:
    settings = get_settings()
    return {
        "ok": True,
        "service": settings.app_name,
        "environment": settings.app_env,
    }