from io import BytesIO

import numpy as np
from fastapi import UploadFile
from PIL import Image, UnidentifiedImageError
from tensorflow.keras.applications.efficientnet import preprocess_input

from app.core.exceptions import FileTooLargeError, InvalidImageError, UnsupportedFileTypeError

ALLOWED_EXTENSIONS = {"jpg", "jpeg", "png"}
ALLOWED_CONTENT_TYPES = {"image/jpeg", "image/png"}
IMAGE_SIZE = (192, 192)


async def read_and_validate_upload(file: UploadFile, max_file_size_bytes: int) -> bytes:
    filename = file.filename or ""
    extension = filename.rsplit(".", 1)[-1].lower() if "." in filename else ""

    if extension not in ALLOWED_EXTENSIONS:
        raise UnsupportedFileTypeError()

    if file.content_type not in ALLOWED_CONTENT_TYPES:
        raise UnsupportedFileTypeError()

    content = await file.read()
    if len(content) > max_file_size_bytes:
        raise FileTooLargeError(max_file_size_bytes)

    return content


def preprocess_image(image_bytes: bytes) -> np.ndarray:
    try:
        image = Image.open(BytesIO(image_bytes)).convert("RGB")
    except (UnidentifiedImageError, OSError) as exc:
        raise InvalidImageError() from exc

    image = image.resize(IMAGE_SIZE)
    image_array = np.asarray(image, dtype=np.float32)
    image_array = np.expand_dims(image_array, axis=0)
    return preprocess_input(image_array)
