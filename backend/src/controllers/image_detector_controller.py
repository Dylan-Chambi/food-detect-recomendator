import traceback
from fastapi import UploadFile, Response, HTTPException
from src.models.object_detector import ObjectDetector
from src.services.food_detection_service import get_food_recomendations
from src.schemas.image_detection import ImageDetection

def food_detection(img_file: UploadFile, confidence: float, predictor: ObjectDetector) -> ImageDetection:
    try:
        return get_food_recomendations(img_file, confidence, predictor)
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail="Internal Server Error")