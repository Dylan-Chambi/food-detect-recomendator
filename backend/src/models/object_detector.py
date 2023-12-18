from ultralytics import YOLO
import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageOps
import random
from .general_detector import GeneralDetector
from src.schemas.detection_object import DetectionObject
from src.schemas.image_detection import ImageDetection
from src.config.config import get_settings
import base64
from io import BytesIO

SETTINGS = get_settings()

class ObjectDetector(GeneralDetector):
    def __init__(self):
        self.model_name = SETTINGS.yolo_version
        self.model = YOLO('./backend/src/detection_models/' + self.model_name)
        super().__init__(self.model)


    def model_info(self):
        return self.model.info()
    

    def detect_objects(self, image: np.ndarray, confidence: float):
        results = self.model.predict(image, conf=confidence)

        class_ids = []
        instance_ids = []
        scores = []
        boxes_sizes = []

        for result in results:
            boxes = result.boxes.cpu().numpy()

            for class_id in boxes.cls:
                class_ids.append(result.names[int(class_id)])
                class_count = class_ids.count(result.names[int(class_id)])
                instance_ids.append(class_count)

            for conf in boxes.conf:
                scores.append(conf)

            for box in boxes.xyxy:
                boxes_sizes.append(box)


        image_pil = Image.fromarray(np.array(image), 'RGB')

        height, width = image_pil.size

        image_detections: list[DetectionObject] = []

        for class_id, instance_id, score, box in zip(class_ids, instance_ids, scores, boxes_sizes):
            print("class_id", class_id)
            print("score", score)
            print("box", box)
            image_detections.append(DetectionObject(
                class_name=class_id,
                instance_id=instance_id,
                box=[box[0] * width, box[1] * height, box[2] * width, box[3] * height],
                confidence=score
            ))

        # covert image_pil to base64
        buffered = BytesIO()
        image_pil.save(buffered, format="JPEG")
        img_str = base64.b64encode(buffered.getvalue())
       
        return ImageDetection(
            image_file=img_str,
            confidence_threshold=confidence,
            image_width=width,
            image_height=height,
            detection_objects=image_detections
        )