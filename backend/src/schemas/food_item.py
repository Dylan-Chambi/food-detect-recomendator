from pydantic import BaseModel

class FoodItem(BaseModel):
    food_name: str
    quantity: int