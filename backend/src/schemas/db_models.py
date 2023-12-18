from sqlmodel import SQLModel, Field, Relationship
from typing import List
from typing import Optional

class DBFoodItem(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    food_name: str
    quantity: int
    recomendation_id: Optional[int] = Field(default=None, foreign_key="dbrecomendation.id")
    recomendation_relation: "DBRecomendation" = Relationship(back_populates="listed_foods")


class DBSingleDietaryRecomendation(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
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
    recomendation_id: Optional[int] = Field(default=None, foreign_key="dbrecomendation.id")
    recomendation_relation: "DBRecomendation" = Relationship(back_populates="dietary_recomendations")

class DBRecomendation(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    listed_foods: List["DBFoodItem"] = Relationship(back_populates="recomendation_relation")
    score: int
    calories: float
    proteins: float
    fats: float
    carbohydrates: float
    fiber: float
    sugar: float
    sodium: float
    general_recomendation: str
    dietary_recomendations: List[DBSingleDietaryRecomendation] = Relationship(back_populates="recomendation_relation")
    image: str