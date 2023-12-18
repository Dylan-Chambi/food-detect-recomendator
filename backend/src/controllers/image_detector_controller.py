import traceback
from fastapi import UploadFile, HTTPException
from src.services.food_detection_service import get_food_recomendations
from src.schemas.detection_object import DetectionObject
from src.models.general_recomendator import GeneralRecomendator
from src.models.general_detector import GeneralDetector

def food_detection(img_file: UploadFile, confidence: float, obj_detector: GeneralDetector, recommend_predictor: GeneralRecomendator):
    try:
        return get_food_recomendations(img_file, confidence, obj_detector, recommend_predictor)
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail="Internal Server Error")