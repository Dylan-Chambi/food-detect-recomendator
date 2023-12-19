from pydantic import BaseModel

class SingleDietaryRecomendation(BaseModel):
    food_name: str
    quantity: int
    calories: float
    proteins: float
    fats: float
    carbohydrates: float
    fiber: float
    sugar: float
    sodium: float
    recomendation: str

class DietaryRecomendation(BaseModel):
    score: int
    general_recomendation: str
    dietary_recomendations: list[SingleDietaryRecomendation]

    
