 
from sqlalchemy.orm import Session
from src.schemas.dietary_recomendation import DietaryRecomendation, SingleDietaryRecomendation
from src.schemas.recomendation_response import Recomendation
from src.schemas.db_models import DBRecomendation, DBSingleDietaryRecomendation
from src.config.config import engine

def get_recommendations_from_db() -> list[DBRecomendation]:
    with Session(engine) as session:
        db_recomendations = session.query(DBRecomendation).all()
        recomendations = [
            Recomendation(
                id=db_recomendation.id,
                score=db_recomendation.score,
                calories=db_recomendation.calories,
                proteins=db_recomendation.proteins,
                fats=db_recomendation.fats,
                carbohydrates=db_recomendation.carbohydrates,
                fiber=db_recomendation.fiber,
                sugar=db_recomendation.sugar,
                sodium=db_recomendation.sodium,
                general_recomendation=db_recomendation.general_recomendation,
                dietary_recomendations=[
                    SingleDietaryRecomendation(
                        food_name=db_single_dietary_recomendation.food_name,
                        quantity=db_single_dietary_recomendation.quantity,
                        calories=db_single_dietary_recomendation.calories,
                        proteins=db_single_dietary_recomendation.proteins,
                        fats=db_single_dietary_recomendation.fats,
                        carbohydrates=db_single_dietary_recomendation.carbohydrates,
                        fiber=db_single_dietary_recomendation.fiber,
                        sugar=db_single_dietary_recomendation.sugar,
                        sodium=db_single_dietary_recomendation.sodium,
                        recomendation=db_single_dietary_recomendation.recomendation,
                    )
                    for db_single_dietary_recomendation in db_recomendation.dietary_recomendations
                ],
                image=db_recomendation.image,
            )
            for db_recomendation in db_recomendations
        ]
        return recomendations
    

def get_recommendation_from_db(recomendation_id: int) -> Recomendation:
    with Session(engine) as session:
        db_recomendation = session.query(DBRecomendation).filter(DBRecomendation.id == recomendation_id).first()
        recomendation = Recomendation(
            id=db_recomendation.id,
            score=db_recomendation.score,
            calories=db_recomendation.calories,
            proteins=db_recomendation.proteins,
            fats=db_recomendation.fats,
            carbohydrates=db_recomendation.carbohydrates,
            fiber=db_recomendation.fiber,
            sugar=db_recomendation.sugar,
            sodium=db_recomendation.sodium,
            general_recomendation=db_recomendation.general_recomendation,
            dietary_recomendations=[
                SingleDietaryRecomendation(
                    food_name=db_single_dietary_recomendation.food_name,
                    quantity=db_single_dietary_recomendation.quantity,
                    calories=db_single_dietary_recomendation.calories,
                    proteins=db_single_dietary_recomendation.proteins,
                    fats=db_single_dietary_recomendation.fats,
                    carbohydrates=db_single_dietary_recomendation.carbohydrates,
                    fiber=db_single_dietary_recomendation.fiber,
                    sugar=db_single_dietary_recomendation.sugar,
                    sodium=db_single_dietary_recomendation.sodium,
                    recomendation=db_single_dietary_recomendation.recomendation,
                )
                for db_single_dietary_recomendation in db_recomendation.dietary_recomendations
            ],
            image=db_recomendation.image,
        )
        return recomendation
    
def add_recommendation_to_db(recomendation: Recomendation) -> None:
    with Session(engine) as session:
        db_recomendation = DBRecomendation(
            score=recomendation.score,
            calories=recomendation.calories,
            proteins=recomendation.proteins,
            fats=recomendation.fats,
            carbohydrates=recomendation.carbohydrates,
            fiber=recomendation.fiber,
            sugar=recomendation.sugar,
            sodium=recomendation.sodium,
            general_recomendation=recomendation.general_recomendation,
            dietary_recomendations=[
                DBSingleDietaryRecomendation(
                    food_name=dietary_recomendation.food_name,
                    quantity=dietary_recomendation.quantity,
                    calories=dietary_recomendation.calories,
                    proteins=dietary_recomendation.proteins,
                    fats=dietary_recomendation.fats,
                    carbohydrates=dietary_recomendation.carbohydrates,
                    fiber=dietary_recomendation.fiber,
                    sugar=dietary_recomendation.sugar,
                    sodium=dietary_recomendation.sodium,
                    recomendation=dietary_recomendation.recomendation,
                )
                for dietary_recomendation in recomendation.dietary_recomendations
            ],
            image=recomendation.image,
        )
        session.add(db_recomendation)
        session.commit()
        session.refresh(db_recomendation)
        return db_recomendation.id
    
def delete_recommendation_from_db(recomendation_id: int) -> None:
    with Session(engine) as session:
        db_recomendation = session.query(DBRecomendation).filter(DBRecomendation.id == recomendation_id).first()
        session.delete(db_recomendation)
        session.commit()