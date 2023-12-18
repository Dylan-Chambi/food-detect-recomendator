from fastapi import APIRouter, Depends
from src.controllers.image_detector_controller import food_detection
from src.predictor.object_detector import ObjectDetector
from src.predictor.gpt_food_recomendation import GPTPredictor
from src.models.general_recomendator import GeneralRecomendator
from src.models.general_detector import GeneralDetector
from src.schemas.food_request import FoodRequest
from src.schemas.recomendation_response import Recomendation
from src.controllers.food_recomendation_controller import list_food_recomendations, get_food_recomendation, add_food_recomendation, delete_food_recomendation


def get_object_segmentator() -> GeneralDetector:
    return ObjectDetector()

def get_recommend_predictor() -> GeneralRecomendator:
    return GPTPredictor()

router = APIRouter()


@router.get("/list-food-recomendations")
def get_food_recommendations() -> list[Recomendation]:
    return list_food_recomendations()

@router.get("/get-food-recomendation")
def get_food_recommendation(recomendation_id: int) -> Recomendation:
    return get_food_recomendation(recomendation_id)

@router.post("/add-food-recomendation")
def add_food_recommendation(recomendation: Recomendation) -> int:
    return add_food_recomendation(recomendation)

@router.delete("/delete-food-recomendation")
def delete_food_recommendation(recomendation_id: int) -> None:
    return delete_food_recomendation(recomendation_id)

@router.post("/predict-food-image")
def predict(food_request: FoodRequest = Depends(), obj_detector: GeneralDetector = Depends(get_object_segmentator), recommend_predictor: GeneralRecomendator = Depends(get_recommend_predictor)) -> Recomendation:
    return food_detection(
        food_request.image_file, food_request.confidence_threshold, obj_detector, recommend_predictor
    )
    

