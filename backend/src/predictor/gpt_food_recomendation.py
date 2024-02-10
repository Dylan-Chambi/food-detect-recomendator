from src.config.config import get_settings
from langchain.chat_models import ChatOpenAI
from langchain.prompts import PromptTemplate
from langchain.output_parsers import PydanticOutputParser
from src.models.general_recomendator import GeneralRecomendator
from src.schemas.dietary_recomendation import DietaryRecomendation
from src.utils.gpt_template import DIETARY_RECOMENDATION_TEMPLATE

SETTINGS = get_settings()


class GPTPredictor(GeneralRecomendator):
    def __init__(self):
        super().__init__(model_name=SETTINGS.gpt_model, model=ChatOpenAI(model_name=SETTINGS.gpt_model, openai_api_key=SETTINGS.api_key, model_kwargs={"response_format": { "type": "json_object" }}))

    def analyze_food_list(self, food_list: dict[str, int]) -> DietaryRecomendation:

        out_parser = PydanticOutputParser(pydantic_object=DietaryRecomendation)


        prompt_tpl = PromptTemplate(
            template=DIETARY_RECOMENDATION_TEMPLATE,
            input_variables=["food_list"],
            partial_variables={"format_instructions": out_parser.get_format_instructions()}
        )

        str_food_list = ""
        for food in food_list:
            str_food_list += "- " + food + "(" + str(food_list[food]) + ")\n"


        llm_input = prompt_tpl.format(food_list=str_food_list)

        prediction = self.model.predict(llm_input, seed=42)

        dietary_recomendation = out_parser.parse(prediction)

        return dietary_recomendation