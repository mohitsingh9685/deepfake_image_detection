from dataclasses import dataclass


@dataclass
class AppException(Exception):
    status_code: int
    message: str
    code: str


class UnsupportedFileTypeError(AppException):
    def __init__(self) -> None:
        super().__init__(
            status_code=415,
            message="Unsupported file format. Only jpg, jpeg, and png are allowed.",
            code="UNSUPPORTED_FILE_TYPE",
        )


class FileTooLargeError(AppException):
    def __init__(self, max_bytes: int) -> None:
        super().__init__(
            status_code=413,
            message=f"File size exceeds allowed limit of {max_bytes} bytes.",
            code="FILE_TOO_LARGE",
        )


class InvalidImageError(AppException):
    def __init__(self) -> None:
        super().__init__(
            status_code=400,
            message="Invalid or corrupted image.",
            code="INVALID_IMAGE",
        )


class ModelInferenceError(AppException):
    def __init__(self) -> None:
        super().__init__(
            status_code=500,
            message="Model inference failed.",
            code="INFERENCE_FAILED",
        )
