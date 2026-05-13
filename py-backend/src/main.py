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


@asynccontextmanager
async def lifespan(app: FastAPI):
    # --- startup ---
    res = connect_db_and_create_table()
    print(res)
    yield
    # --- shutdown ---


app = FastAPI(
    lifespan=lifespan,
    docs_url=None if is_production else "/docs",
    redoc_url=None if is_production else "/redoc",
    openapi_url=None if is_production else "/openapi.json",
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


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
