from pydantic_settings import BaseSettings, SettingsConfigDict
from functools import cache
from sqlalchemy import create_engine


engine: str = create_engine("sqlite:///backend/src/db/food.db")

class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file="Backend/.env")
    
    api_name: str = "Food Detector and Recomendator"
    revision: str = "local"
    yolo_version: str = "yolov8x-custom.pt" # El modelo a cargar debe estar en backend/src/dectection_models
    log_level: str = "DEBUG"
    api_key: str = ""
    gpt_model: str = "gpt-3.5-turbo-1106"
    port: int = 8080

@cache
def get_settings() -> Settings:
    return Settings()