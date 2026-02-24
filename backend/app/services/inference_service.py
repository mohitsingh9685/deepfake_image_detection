import numpy as np

from app.config import Settings
from app.core.exceptions import ModelInferenceError
from app.core.logging_config import logger
from app.models.prediction_model import PredictionModel
from app.schemas.prediction_schema import PredictionResponse
from app.utils.image_processing import preprocess_image


class InferenceService:
    def __init__(self, model: PredictionModel, settings: Settings) -> None:
        self.model = model
        self.settings = settings

    def predict(self, image_bytes: bytes) -> PredictionResponse:
        processed_image = preprocess_image(image_bytes)

        try:
            prediction_output = self.model.predict(processed_image)
            fake_score = float(np.squeeze(prediction_output))
        except Exception as exc:
            logger.exception("Inference failure", error=str(exc))
            raise ModelInferenceError() from exc

        fake_score = max(0.0, min(1.0, fake_score))
        predicted_label = "Fake" if fake_score >= 0.5 else "Real"
        confidence = fake_score if predicted_label == "Fake" else (1.0 - fake_score)

        return PredictionResponse(
            prediction=predicted_label,
            confidence=confidence,
            model_version=self.settings.model_version,
        )
