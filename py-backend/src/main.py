from .configs.env import load_dotenv
from contextlib import asynccontextmanager
from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from .db.postgresDb import (
    connect_db_and_create_table,
)
import os
from .routes.affiliateproducts_routes import router as affiliate_products_router
from .routes.admin_routes.adminAffiliateproducts_routes import (
    router as admin_affiliate_products_router,
)


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


@asynccontextmanager
async def lifespan(app: FastAPI):
    # --- startup ---
    res = connect_db_and_create_table()
    print(res)
    yield
    # --- shutdown ---


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
app.include_router(
    admin_affiliate_products_router,
    prefix="/admin/affiliate-products",
    tags=["admin-affiliate-products"],
)
