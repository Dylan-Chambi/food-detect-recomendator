FROM python:3.11
ENV PORT 8080

RUN apt-get update && apt-get install libgl1 -y

COPY requirements.txt /
RUN pip install -r requirements.txt


COPY ./src /src

RUN mkdir -p ./src/detection_models

RUN curl -L https://storage.googleapis.com/topicos-ia-2023/yolov8x-custom.pt -o ./src/detection_models/yolov8x-custom.pt

COPY app.py /app.py

CMD uvicorn app:app --host 0.0.0.0 --port ${PORT}
