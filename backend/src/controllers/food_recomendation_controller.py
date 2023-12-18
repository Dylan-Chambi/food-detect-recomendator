
import traceback
from src.schemas.recomendation_response import Recomendation
from src.services.food_data_service import get_recommendations_from_db, get_recommendation_from_db, add_recommendation_to_db, delete_recommendation_from_db
from fastapi import HTTPException


def list_food_recomendations() -> list[Recomendation]:
    try:
        return get_recommendations_from_db()
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail="Internal Server Error")
    
def get_food_recomendation(recomendation_id: int) -> Recomendation:
    try:
        return get_recommendation_from_db(recomendation_id)
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail="Item not found")
    
def add_food_recomendation(recomendation: Recomendation) -> int:
    try:
        return add_recommendation_to_db(recomendation)
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail="Internal Server Error")
    
def delete_food_recomendation(recomendation_id: int) -> None:
    try:
        delete_recommendation_from_db(recomendation_id)
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail="Item not found")