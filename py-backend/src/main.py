from .configs.env import load_dotenv
from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from .db.postgresDb import (
    connect_db_and_create_table,
)
import os

from .routes.affiliateproducts_routes import router as affiliate_products_router


is_production = os.getenv("ENV") == "PRODUCTION"

app = FastAPI(
    docs_url=None if is_production else "/docs",
    redoc_url=None if is_production else "/redoc",
    openapi_url=None if is_production else "/openapi.json",
)

origins: list[str] = (
    [
        "https://karan.email",
        "https://api.karan.email",
    ]
    if is_production
    else ["http://localhost:5173"]
)

app.add_middleware(
    CORSMiddleware,  # pyrefly: ignore
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def on_startup():
    connect_db_and_create_table()


@app.get("/")
async def main() -> str:
    return "Hey api2🎉 :]"


@app.get("/health")
async def health() -> str:
    return "api2 health ✅ :]"


# routes
app.include_router(
    affiliate_products_router, prefix="/affiliate-products", tags=["affiliate-products"]
)
