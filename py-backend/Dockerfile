FROM python:3.12-alpine

WORKDIR /app

# Use apk (Alpine package manager) instead of apt-get
RUN apk update && apk add --no-cache \
    gcc \
    musl-dev \
    postgresql-dev

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

EXPOSE 8000

# CMD ["python", "-m", "src.main"]
# CMD ["uvicorn", "src.main:app"]
# CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000"]
CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000"]
