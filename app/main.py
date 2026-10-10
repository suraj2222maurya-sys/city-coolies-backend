from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes.auth import (
    router as auth_router,
    warm_email_connection,
)
from app.core.config import get_settings


settings = get_settings()

app = FastAPI(
    title=settings.app_name,
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(auth_router)

@app.on_event("startup")
def warm_gmail_connection_on_startup():
    warm_email_connection()


@app.get("/health")
def health_check():
    return {
        "status": "ok",
        "service": "city-coolies-backend",
    }

@app.get("/bakend")
def backend_status():
    return {
        "status": "ok",
        "service": "city-coolies-backend",
        "message": "City Coolies backend is running",
        "docs": "/docs",
        "health": "/health",
    }