from pydantic import BaseModel
from src.schemas.food_item import FoodItem
from src.schemas.dietary_recomendation import SingleDietaryRecomendation


class Recomendation(BaseModel):
    listed_foods: list[FoodItem]
    score: int
    calories: float
    proteins: float
    fats: float
    carbohydrates: float
    fiber: float
    sugar: float
    sodium: float
    general_recomendation: str
    dietary_recomendations: list[SingleDietaryRecomendation]
    image: str

    
