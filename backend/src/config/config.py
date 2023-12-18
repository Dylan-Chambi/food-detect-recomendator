from pydantic_settings import BaseSettings, SettingsConfigDict
from functools import cache

class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file="Backend/.env")
    
    api_name: str = "Food Detector and Recomendator"
    revision: str = "local"
    yolo_version: str = "yolov8x-custom.pt" # El modelo a cargar debe estar en backend/src/dectection_models
    log_level: str = "DEBUG"
    port: int = 8080

@cache
def get_settings() -> Settings:
    return Settings()