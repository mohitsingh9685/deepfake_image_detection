from fastapi import Request

from app.config import Settings, get_settings
from app.services.inference_service import InferenceService


def get_app_settings() -> Settings:
    return get_settings()


def get_inference_service(request: Request) -> InferenceService:
    model = request.app.state.model
    settings = request.app.state.settings
    return InferenceService(model=model, settings=settings)
