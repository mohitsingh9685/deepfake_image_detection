FROM python:3.11-slim

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

RUN pip install --no-cache-dir uv

COPY pyproject.toml uv.lock ./

RUN uv sync --frozen --no-dev

COPY . .

# EXPOSE 8000

# CMD ["uv", "run", "gunicorn", "app.main:app", "-k", "uvicorn.workers.UvicornWorker", "-w", "1", "-b", "0.0.0.0:8000", "--access-logfile", "-", "--error-logfile", "-"]


EXPOSE 7860

CMD ["uv", "run", "gunicorn", "app.main:app", 
     "-k", "uvicorn.workers.UvicornWorker",
     "-w", "1",
     "-b", "0.0.0.0:7860",
     "--timeout", "300",
     "--access-logfile", "-",
     "--error-logfile", "-"]