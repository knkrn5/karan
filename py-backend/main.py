from fastapi import FastAPI, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from src.db.postgresDb import (
    connect_db_and_create_table,
)

from src.routes.affiliateproducts_routes import router as affiliate_products_router


app = FastAPI(
    # docs_url=None,
    # redoc_url=None,
    # openapi_url=None,
)

origins = ["http://localhost:5173", "https://karan.email", "https://api.karan.email"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def on_startup():
    connect_db_and_create_table()


@app.get("/")
async def main():
    return "Hey api2🎉 :]"


@app.get("/health")
async def health():
    return "api2 health ✅ :]"


# routes
app.include_router(
    affiliate_products_router, prefix="/affiliate-products", tags=["affiliate-products"]
)

