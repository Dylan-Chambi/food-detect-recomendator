from fastapi import APIRouter, Depends
from src.controllers.image_detector_controller import food_detection
from src.models.object_detector import ObjectDetector
from src.schemas.food_request import FoodRequest
from src.schemas.image_detection import ImageDetection


def get_object_segmentator():
    return ObjectDetector()

router = APIRouter()


# @router.get("/status")
# def root(predictor_model: ObjectSegmentator = Depends(get_object_segmentator)) -> Status:
#     return get_service_status(predictor_model)

@router.post("/predict-food-image")
def predict(food_request: FoodRequest = Depends(), predictor: ObjectDetector = Depends(get_object_segmentator)) -> ImageDetection:
    return food_detection(
        food_request.image_file, food_request.confidence_threshold, predictor
    )
    


# @router.get("/reports", response_class=StreamingResponse)
# def reports(csv_service: CSVService = Depends(get_csv_service)) -> StreamingResponse:
#     return get_reports(csv_service)