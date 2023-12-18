from pydantic import BaseModel

class DetectionObject(BaseModel):
    class_name: str
    instance_id: int
    box: list[float]
    confidence: float
