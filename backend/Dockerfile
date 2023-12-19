FROM python:3.11
ENV PORT 8080

COPY requirements.txt /
RUN pip install -r requirements.txt


COPY ./src /src

COPY app.py /app.py

CMD uvicorn app:app --host 0.0.0.0 --port ${PORT}
