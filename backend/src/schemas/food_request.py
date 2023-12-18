from fastapi import File, UploadFile
from typing import Optional
from pydantic import BaseModel, Field
from .languages import Language

class FoodRequest(BaseModel):
    image_file: UploadFile = File(..., description="Image file to predict")
    confidence_threshold: Optional[float] = Field(0.5, ge=0.0, le=1.0, description="Confidence threshold for the predictions")
    language: Optional[Language] = Field(Language.EN, description="Language to use in the response")