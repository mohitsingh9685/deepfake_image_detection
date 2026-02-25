from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import ORJSONResponse
from slowapi.errors import RateLimitExceeded
from slowapi.middleware import SlowAPIMiddleware

from app.config import get_settings
from app.core.exception_handlers import (
    app_exception_handler,
    generic_exception_handler,
    rate_limit_exception_handler,
    validation_exception_handler,
)
from app.core.exceptions import AppException
from app.core.logging_config import configure_logging, logger
from app.models.prediction_model import PredictionModel
from app.routes.prediction import limiter, router as prediction_router
from app.utils.download_model_weights import download_model_weights

@asynccontextmanager
async def lifespan(app: FastAPI):
    settings = get_settings()
    configure_logging(debug=settings.debug)

    logger.info("Starting deepfake backend", model_path=settings.model_path)
    
    #Download model weights if not present
    if settings.huggingface_model_url:
        download_model_weights(
            settings.huggingface_model_url,
            settings.model_path
        )

    # Load model
    app.state.settings = settings
    app.state.model = PredictionModel.get_instance(settings.model_path)
    app.state.limiter = limiter

    yield

    logger.info("Shutting down deepfake backend")


settings = get_settings()
app = FastAPI(
    title="Deepfake Image Detection API",
    version="1.0.0",
    debug=settings.debug,
    default_response_class=ORJSONResponse,
    lifespan=lifespan,
)

app.add_exception_handler(AppException, app_exception_handler)
app.add_exception_handler(RequestValidationError, validation_exception_handler)
app.add_exception_handler(RateLimitExceeded, rate_limit_exception_handler)
app.add_exception_handler(Exception, generic_exception_handler)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_allow_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)
app.add_middleware(SlowAPIMiddleware)

app.include_router(prediction_router)