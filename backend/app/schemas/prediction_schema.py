from typing import Literal

from pydantic import BaseModel, Field


class PredictionResponse(BaseModel):
    prediction: Literal["Real", "Fake"]
    confidence: float = Field(ge=0.0, le=1.0)
    model_version: str
