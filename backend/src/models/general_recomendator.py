from abc import ABC
from src.schemas.dietary_recomendation import SingleDietaryRecomendation


class GeneralRecomendator(ABC):
    def __init__(self, model_name: str, model):
        self.model_name = model_name
        self.model = model

    def analyze_food_list(self, food_list: list[SingleDietaryRecomendation]):
        raise NotImplementedError