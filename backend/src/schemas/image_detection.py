from fastapi import File
from pydantic import BaseModel
from .detection_object import DetectionObject

class ImageDetection(BaseModel):
    image_file: str
    confidence_threshold: float
    image_width: int
    image_height: int
    detection_objects: list[DetectionObject]


