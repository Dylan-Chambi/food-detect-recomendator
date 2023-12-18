from fastapi import UploadFile, Response
from src.predictor.object_detector import ObjectDetector
import io
from PIL import Image
import numpy as np
import cv2
from src.middlewares.image_detector_middleware import validate_image
from src.models.general_recomendator import GeneralRecomendator
from src.models.general_detector import GeneralDetector
from src.schemas.food_item import FoodItem
from src.schemas.image_detection import ImageDetection
from src.schemas.recomendation_response import Recomendation
from src.schemas.db_models import DBFoodItem, DBRecomendation, DBSingleDietaryRecomendation
from sqlmodel import Session
from src.config.config import engine

def get_food_recomendations(img_file: UploadFile, confidence: float, obj_detector: GeneralDetector, recommend_predictor: GeneralRecomendator) -> Recomendation:

    validate_image(img_file)

    image_bytes = img_file.file.read()
    image = np.frombuffer(image_bytes, dtype=np.uint8)
    image = cv2.imdecode(image, cv2.IMREAD_COLOR)

    img_dect: ImageDetection = obj_detector.detect_objects(image, confidence)

    # food_list: FoodItem = [FoodItem(food_name="bacon", quantity=3), FoodItem(food_name="french-fries", quantity=1), FoodItem(food_name="lettuce", quantity=2)]
    items = {}


    for food in img_dect.detection_objects:
        if food.class_name in items:
            items[food.class_name] += 1
        else:
            items[food.class_name] = 1

    food_list: FoodItem = []

    for key, value in items.items():
        food_list.append(FoodItem(food_name=key, quantity=value))

    if len(food_list) > 0:

        recomendation_pred = recommend_predictor.analyze_food_list(food_list)

        recomendation: Recomendation = Recomendation(
            listed_foods=food_list,
            image=img_dect.image_file,
            general_recomendation=recomendation_pred.general_recomendation,
            dietary_recomendations=recomendation_pred.dietary_recomendations,
            score=recomendation_pred.score,
            calories=sum([single_rec.calories * single_rec.quantity for single_rec in recomendation_pred.dietary_recomendations]),
            proteins=sum([single_rec.proteins * single_rec.quantity for single_rec in recomendation_pred.dietary_recomendations]),
            fats=sum([single_rec.fats * single_rec.quantity for single_rec in recomendation_pred.dietary_recomendations]),
            carbohydrates=sum([single_rec.carbohydrates * single_rec.quantity for single_rec in recomendation_pred.dietary_recomendations]),
            fiber=sum([single_rec.fiber * single_rec.quantity for single_rec in recomendation_pred.dietary_recomendations]),
            sugar=sum([single_rec.sugar * single_rec.quantity for single_rec in recomendation_pred.dietary_recomendations]),
            sodium=sum([single_rec.sodium * single_rec.quantity for single_rec in recomendation_pred.dietary_recomendations])
        )

        db_food_list = [
            DBFoodItem(food_name=item.food_name, quantity=item.quantity)
            for item in food_list
        ]

        db_single_dietary_recomendations = [
            DBSingleDietaryRecomendation(
                food_name=sdr.food_name,
                quantity=sdr.quantity,
                calories=sdr.calories,
                proteins=sdr.proteins,
                fats=sdr.fats,
                carbohydrates=sdr.carbohydrates,
                fiber=sdr.fiber,
                sugar=sdr.sugar,
                sodium=sdr.sodium,
                recomendation=sdr.recomendation,
            )
            for sdr in recomendation_pred.dietary_recomendations
        ]

        db_recomendation = DBRecomendation(
            listed_foods=db_food_list,
            score=recomendation.score,
            calories=recomendation.calories,
            proteins=recomendation.proteins,
            fats=recomendation.fats,
            carbohydrates=recomendation.carbohydrates,
            fiber=recomendation.fiber,
            sugar=recomendation.sugar,
            sodium=recomendation.sodium,
            general_recomendation=recomendation.general_recomendation,
            dietary_recomendations=db_single_dietary_recomendations,
            image=img_dect.image_file,
        )

        with Session(engine) as session:
            session.add(db_recomendation)
            session.commit()

        return recomendation
    
    else:
        return Recomendation(
            listed_foods=food_list,
            image=img_dect.image_file,
            general_recomendation="No food detected",
            dietary_recomendations=[],
            score=0,
            calories=0,
            proteins=0,
            fats=0,
            carbohydrates=0,
            fiber=0,
            sugar=0,
            sodium=0
        )