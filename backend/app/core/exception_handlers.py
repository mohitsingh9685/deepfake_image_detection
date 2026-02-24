from fastapi import Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import ORJSONResponse
from slowapi.errors import RateLimitExceeded

from app.core.exceptions import AppException
from app.core.logging_config import logger


async def app_exception_handler(_: Request, exc: AppException) -> ORJSONResponse:
    logger.warning("Application error", code=exc.code, message=exc.message)
    return ORJSONResponse(
        status_code=exc.status_code,
        content={"error": {"code": exc.code, "message": exc.message}},
    )


async def validation_exception_handler(_: Request, exc: RequestValidationError) -> ORJSONResponse:
    logger.warning("Validation error", errors=exc.errors())
    return ORJSONResponse(
        status_code=422,
        content={"error": {"code": "VALIDATION_ERROR", "message": "Invalid request payload."}},
    )


async def rate_limit_exception_handler(_: Request, exc: RateLimitExceeded) -> ORJSONResponse:
    logger.warning("Rate limit exceeded", detail=str(exc.detail))
    return ORJSONResponse(
        status_code=429,
        content={"error": {"code": "RATE_LIMIT_EXCEEDED", "message": "Rate limit exceeded."}},
    )


async def generic_exception_handler(_: Request, exc: Exception) -> ORJSONResponse:
    logger.exception("Unhandled error", error=str(exc))
    return ORJSONResponse(
        status_code=500,
        content={"error": {"code": "INTERNAL_SERVER_ERROR", "message": "Internal server error."}},
    )
