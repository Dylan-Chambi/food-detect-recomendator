from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.routers.router import router
from src.config.config import get_settings, engine
from sqlmodel import SQLModel

SETTINGS = get_settings()

SQLModel.metadata.create_all(engine)

app = FastAPI(title=SETTINGS.api_name, version=SETTINGS.revision)

origins = [
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router, tags=["router"])

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", reload=True, port=SETTINGS.port)