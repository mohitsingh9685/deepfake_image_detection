from threading import Lock

import numpy as np
import tensorflow as tf

class PredictionModel:
    _instance = None

    def __init__(self, weights_path: str):
        self._model = self._build_model()
        self._model.load_weights(weights_path)

    @classmethod
    def get_instance(cls, weights_path: str):
        if cls._instance is None:
            cls._instance = cls(weights_path)
        return cls._instance

    def predict(self, processed_image):
        return self._model.predict(processed_image)

    @staticmethod
    def _build_model():
        inputs = tf.keras.Input(shape=(192, 192, 3))

        base_model = tf.keras.applications.EfficientNetB0(
            input_shape=(192, 192, 3),
            include_top=False,
            weights=None  # IMPORTANT
        )

        x = base_model(inputs, training=False)
        x = tf.keras.layers.GlobalAveragePooling2D()(x)
        x = tf.keras.layers.Dropout(0.5)(x)
        outputs = tf.keras.layers.Dense(1, activation="sigmoid")(x)

        model = tf.keras.Model(inputs, outputs)

        return model