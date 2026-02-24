import os
from functools import lru_cache

from dotenv import load_dotenv
from pydantic import BaseModel, Field, field_validator

load_dotenv()


class Settings(BaseModel):
	model_path: str = Field(default="models/deepfake.weights.h5")
	debug: bool = Field(default=False)
	api_rate_limit: str = Field(default="5/minute")
	cors_allow_origins: list[str] = Field(default_factory=lambda: ["http://localhost:5173"])
	max_file_size_bytes: int = Field(default=5 * 1024 * 1024)
	model_version: str = Field(default="v1")

	@field_validator("api_rate_limit")
	@classmethod
	def validate_api_rate_limit(cls, value: str) -> str:
		if "/" not in value:
			raise ValueError("API_RATE_LIMIT must follow pattern like '5/minute'.")
		return value


@lru_cache(maxsize=1)
def get_settings() -> Settings:
	origins = os.getenv("CORS_ALLOW_ORIGINS", "http://localhost:5173")
	parsed_origins = [origin.strip() for origin in origins.split(",") if origin.strip()]

	return Settings(
		model_path=os.getenv("MODEL_PATH", "models/deepfake_v1.weights.h5"),
		debug=os.getenv("DEBUG", "false").lower() == "true",
		api_rate_limit=os.getenv("API_RATE_LIMIT", "5/minute"),
		cors_allow_origins=parsed_origins,
		max_file_size_bytes=int(os.getenv("MAX_FILE_SIZE_BYTES", str(5 * 1024 * 1024))),
		model_version=os.getenv("MODEL_VERSION", "v1"),
	)
