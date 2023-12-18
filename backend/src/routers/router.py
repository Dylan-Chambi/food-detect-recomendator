from fastapi import APIRouter, Depends
from src.controllers.image_detector_controller import food_detection
from src.predictor.object_detector import ObjectDetector
from src.predictor.gpt_food_recomendation import GPTPredictor
from src.models.general_recomendator import GeneralRecomendator
from src.models.general_detector import GeneralDetector
from src.schemas.food_request import FoodRequest
from src.schemas.recomendation_response import Recomendation


def get_object_segmentator() -> GeneralDetector:
    return ObjectDetector()

def get_recommend_predictor() -> GeneralRecomendator:
    return GPTPredictor()

router = APIRouter()


# @router.get("/status")
# def root(predictor_model: ObjectSegmentator = Depends(get_object_segmentator)) -> Status:
#     return get_service_status(predictor_model)

@router.post("/predict-food-image")
def predict(food_request: FoodRequest = Depends(), obj_detector: GeneralDetector = Depends(get_object_segmentator), recommend_predictor: GeneralRecomendator = Depends(get_recommend_predictor)) -> Recomendation:
    return food_detection(
        food_request.image_file, food_request.confidence_threshold, obj_detector, recommend_predictor
    )
    


# @router.get("/reports", response_class=StreamingResponse)
# def reports(csv_service: CSVService = Depends(get_csv_service)) -> StreamingResponse:
#     return get_reports(csv_service)