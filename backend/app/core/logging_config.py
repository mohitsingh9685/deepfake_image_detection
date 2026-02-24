import sys

from loguru import logger


def configure_logging(debug: bool) -> None:
    logger.remove()
    logger.add(
        sys.stdout,
        level="DEBUG" if debug else "INFO",
        serialize=True,
        backtrace=debug,
        diagnose=debug,
    )


__all__ = ["logger", "configure_logging"]
