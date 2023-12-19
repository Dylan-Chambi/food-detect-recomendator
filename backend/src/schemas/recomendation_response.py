from pydantic import BaseModel
from src.schemas.dietary_recomendation import SingleDietaryRecomendation


class Recomendation(BaseModel):
    id: int | None = None
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

    
