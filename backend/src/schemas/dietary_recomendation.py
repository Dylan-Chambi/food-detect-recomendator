from pydantic import BaseModel
from src.schemas.food_item import FoodItem


class SingleDietaryRecomendation(FoodItem, BaseModel):
    calories: float
    proteins: float
    fats: float
    carbohydrates: float
    fiber: float
    sugar: float
    sodium: float
    recomendation: str

class DietaryRecomendation(BaseModel):
    listed_foods: list[FoodItem]
    score: int
    general_recomendation: str
    dietary_recomendations: list[SingleDietaryRecomendation]

    
