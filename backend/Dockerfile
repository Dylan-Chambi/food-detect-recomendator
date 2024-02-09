FROM python:3.11-slim as builder

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN --mount=type=cache,target=/var/cache/apt --mount=type=cache,target=/var/lib/apt \
    apt-get update && \
    apt-get install -y --no-install-recommends gcc

COPY requirements.txt .
RUN --mount=type=cache,target=/root/.cache/pip pip install --no-cache-dir --prefix /install -r requirements.txt


FROM python:3.11-slim as production

ENV PORT 8080

RUN --mount=type=cache,target=/var/cache/apt --mount=type=cache,target=/var/lib/apt \
    apt-get update && \
    apt-get install -y --no-install-recommends libgl1 libgl1-mesa-glx libglib2.0-0 && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY --from=builder /install /usr/local

COPY app.py .
COPY src ./src

CMD uvicorn app:app --host 0.0.0.0 --port ${PORT}
