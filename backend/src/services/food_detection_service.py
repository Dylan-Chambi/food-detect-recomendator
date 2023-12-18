from fastapi import UploadFile, Response
from src.predictor.object_detector import ObjectDetector
import io
from PIL import Image
import numpy as np
from src.middlewares.image_detector_middleware import validate_image
from src.models.general_recomendator import GeneralRecomendator
from src.models.general_detector import GeneralDetector
from src.schemas.food_item import FoodItem
from src.schemas.image_detection import ImageDetection


def get_food_recomendations(img_file: UploadFile, confidence: float, obj_detector: GeneralDetector, recommend_predictor: GeneralRecomendator):

    validate_image(img_file)

    img_stream = io.BytesIO(img_file.file.read())
    img_obj = Image.open(img_stream)
    img_array = np.array(img_obj)

    img_dect: ImageDetection = obj_detector.detect_objects(img_array, confidence)

    # food_list: FoodItem = [FoodItem(food_name="bacon", quantity=3), FoodItem(food_name="french-fries", quantity=1), FoodItem(food_name="lettuce", quantity=2)]
    items = {}


    for food in img_dect.detection_objects:
        if food.class_name in items:
            items[food.class_name] += 1
        else:
            items[food.class_name] = 1

    food_list = []

    for key, value in items.items():
        food_list.append(FoodItem(food_name=key, quantity=value))

    res = recommend_predictor.analyze_food_list(food_list)

    return res