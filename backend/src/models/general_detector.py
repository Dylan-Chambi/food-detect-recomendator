from abc import ABC


class GeneralDetector(ABC):
    def __init__(self, model):
        self.model = model

    def detect_objects(self, image):
        pass