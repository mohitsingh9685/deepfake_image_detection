# Deepfake Image Detection Backend

Production-ready FastAPI inference service for EfficientNet-based deepfake image detection.

## Features

- FastAPI + TensorFlow inference API
- Singleton model loading at startup
- `/health` and `/predict` endpoints
- Input validation (type + size)
- SlowAPI rate limiting (default `5/minute` per IP)
- Structured JSON logging via Loguru
- Environment-driven configuration using `.env`
- Docker-ready with `gunicorn` + `uvicorn` workers

## Environment Variables

Set in `.env`:

- `MODEL_PATH` (default: `model_weights/deepfake_model_v1.keras`)
- `DEBUG` (default: `false`)
- `API_RATE_LIMIT` (default: `5/minute`)
- `CORS_ALLOW_ORIGINS` (comma-separated, default: `http://localhost:5173`)
- `MAX_FILE_SIZE_BYTES` (default: `5242880`)
- `MODEL_VERSION` (default: `v1`)

## Local Run

```bash
uv sync --frozen
uv run uvicorn app.main:app --host 0.0.0.0 --port 8000
```

## Docker Run

```bash
docker build -t deepfake-backend .
docker run --rm -p 8000:8000 --env-file .env deepfake-backend
```

## API

### Health

- `GET /health`

Response:

```json
{
	"status": "ok"
}
```

### Predict

- `POST /predict`
- `multipart/form-data` with `file`
- accepted types: `jpg`, `jpeg`, `png`

Response:

```json
{
	"prediction": "Real",
	"confidence": 0.93,
	"model_version": "v1"
}
```

