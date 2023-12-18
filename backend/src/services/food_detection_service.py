from fastapi import UploadFile, Response
from src.models.object_detector import ObjectDetector
import io
from PIL import Image
import numpy as np
from src.middlewares.image_detector_middleware import validate_image
from src.schemas.image_detection import ImageDetection

def get_food_recomendations(img_file: UploadFile, confidence: float, predictor: ObjectDetector) -> ImageDetection:
    # Validate the image file
    validate_image(img_file)

    # Read the image file into a stream
    img_stream = io.BytesIO(img_file.file.read())

    # Convert to a Pillow image
    img_obj = Image.open(img_stream)

    # Convert to a NumPy array
    img_array = np.array(img_obj)

    # Perform image segmentation using the provided predictor
    img_dect = predictor.detect_objects(img_array, confidence)

    # Return the segmented image as a FastAPI Response
    return img_dect