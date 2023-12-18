import io
from fastapi import UploadFile, HTTPException, status, Response
from PIL import Image, UnidentifiedImageError


def validate_image(img: UploadFile):
    """
    Validates the image file
    """

    # Check if the content type is an image
    if img.content_type.split("/")[0] != "image":
        raise HTTPException(
            status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE,
            detail="Not an image"
        )

    # Check if the image is corrupted
    try:
        img_stream = io.BytesIO(img.file.read())
        Image.open(img_stream)
    except UnidentifiedImageError:
        raise HTTPException(
            status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE,
            detail="Image is corrupted or not supported"
        )
    finally:
        img.file.seek(0)