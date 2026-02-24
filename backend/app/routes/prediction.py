from fastapi import APIRouter, Depends, File, Request, UploadFile
from slowapi import Limiter
from slowapi.util import get_remote_address

from app.config import Settings, get_settings
from app.core.logging_config import logger
from app.dependencies import get_app_settings, get_inference_service
from app.schemas.prediction_schema import PredictionResponse
from app.services.inference_service import InferenceService
from app.utils.image_processing import read_and_validate_upload

settings = get_settings()
limiter = Limiter(key_func=get_remote_address, default_limits=[settings.api_rate_limit])

router = APIRouter(tags=["prediction"])


@router.get("/health")
async def health() -> dict[str, str]:
    return {"status": "ok"}


@router.post("/predict", response_model=PredictionResponse)
@limiter.limit(settings.api_rate_limit)
async def predict_image(
    request: Request,
    file: UploadFile = File(...),
    inference_service: InferenceService = Depends(get_inference_service),
    app_settings: Settings = Depends(get_app_settings),
) -> PredictionResponse:
    image_bytes = await read_and_validate_upload(file, app_settings.max_file_size_bytes)
    result = inference_service.predict(image_bytes)
    logger.info(
        "Prediction successful",
        client_ip=get_remote_address(request),
        filename=file.filename,
        prediction=result.prediction,
        confidence=result.confidence,
    )
    return result
