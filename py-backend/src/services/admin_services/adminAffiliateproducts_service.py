from sqlalchemy.exc import IntegrityError, OperationalError, DatabaseError
from sqlmodel import create_engine, Session, select
from sqlalchemy import func
from uuid import UUID
from collections.abc import Sequence
from ...models.affliateproducts_model import Product, Cart
from datetime import datetime, timezone
from ...db.postgresDb import DATABASE_URL
from ...utils.api_response import ApiResponse


# Ensure DATABASE_URL is a string
engine = create_engine(str(DATABASE_URL))


class AdminAffiliateProductsService:
    @staticmethod
    def add_product(product: Product) -> ApiResponse:
        try:
            with Session(engine) as session:
                session.add(product)
                session.commit()
                return ApiResponse(
                    status_code=201,
                    is_success=True,
                    message=f"Product {product.name} added to the database.",
                    data=product.model_dump(),
                )
        except IntegrityError as e:
            return ApiResponse(
                status_code=400,
                is_success=False,
                message=f"Integrity error: {e}",
                data=None,
            )
        except OperationalError as e:
            return ApiResponse(
                status_code=500,
                is_success=False,
                message=f"Operational error: {e}",
                data=None,
            )
        except DatabaseError as e:
            return ApiResponse(
                status_code=500,
                is_success=False,
                message=f"Database error: {e}",
                data=None,
            )
        except Exception as e:
            return ApiResponse(
                status_code=500,
                is_success=False,
                message=f"Unexpected error: {e}",
                data=None,
            )

    @staticmethod
    def get_product_by_name(product_name: str) -> ApiResponse:
        try:
            if not product_name:
                raise ValueError("Product name cannot be empty.")
            with Session(engine) as session:
                products = session.exec(
                    select(Product).where(
                        func.lower(Product.name).ilike(
                            f"%{product_name.strip().lower()}%"
                        )
                    )
                ).all()

                if not products:
                    raise ValueError(f"No products found with name: {product_name}")

                return ApiResponse(
                    status_code=200,
                    is_success=True,
                    message=f"{'Products' if len(products) > 1 else 'Product'} with name '{product_name}' fetched successfully.",
                    data=products,
                )

        except ValueError as e:
            return ApiResponse(
                status_code=400,
                is_success=False,
                message=str(e),
                data=None,
            )
        except OperationalError as e:
            return ApiResponse(
                status_code=500,
                is_success=False,
                message=f"Operational error: {e}",
                data=None,
            )
        except DatabaseError as e:
            return ApiResponse(
                status_code=500,
                is_success=False,
                message=f"Database error: {e}",
                data=None,
            )
        except Exception as e:
            return ApiResponse(
                status_code=500,
                is_success=False,
                message=f"Error fetching product by name {product_name}: {e}",
                data=None,
            )

    @staticmethod
    def update_product_fields(product_id: UUID, fields_to_updates: dict[str, object]):
        try:
            with Session(engine) as session:
                product: Product | None = session.get(Product, product_id)
                if not product:
                    raise ValueError(f"Product not found with ID: {product_id}.")

                for field_key, field_value in fields_to_updates.items():
                    if hasattr(product, field_key):
                        if not field_value:
                            raise ValueError(
                                f"Field '{field_key}' value cannot be empty."
                            )
                        setattr(product, field_key, field_value)
                    else:
                        raise ValueError(
                            f"Product does not have the attribute '{field_key}'."
                        )

                session.add(product)
                session.commit()
                return ApiResponse(
                    status_code=200,
                    is_success=True,
                    message=f"Product {product.name} updated successfully.",
                    data=product,
                )
        except ValueError as e:
            return ApiResponse(
                status_code=400,
                is_success=False,
                message=str(e),
                data=None,
            )
        except IntegrityError as e:
            return ApiResponse(
                status_code=400,
                is_success=False,
                message=f"Integrity error: {e}",
                data=None,
            )
        except OperationalError as e:
            return ApiResponse(
                status_code=500,
                is_success=False,
                message=f"Operational error: {e}",
                data=None,
            )
        except DatabaseError as e:
            return ApiResponse(
                status_code=500,
                is_success=False,
                message=f"Database error: {e}",
                data=None,
            )
        except Exception as e:
            return ApiResponse(
                status_code=500,
                is_success=False,
                message=f"Unexpected error: {e}",
                data=None,
            )

    @staticmethod
    def delete_products(product_ids: list[UUID]) -> ApiResponse:
        try:
            product_ids_str: list[str] = [str(id) for id in product_ids]

            with Session(engine) as session:
                # first removing products from all carts
                carts_with_products = session.exec(
                    select(Cart).where(Cart.product_ids.op("&&")(product_ids_str))  # pyright: ignore[reportAttributeAccessIssue]
                ).all()

                for cart in carts_with_products:
                    cart.product_ids = [
                        pid for pid in cart.product_ids if pid not in product_ids_str
                    ]
                    cart.updated_at = datetime.now(timezone.utc)
                    session.add(cart)

                # then Deleting products from the database
                for id in product_ids:
                    product = session.get(Product, id)
                    if product:
                        session.delete(product)

                session.commit()
                return ApiResponse(
                    status_code=200,
                    is_success=True,
                    message=f"Products with IDs {product_ids_str} deleted successfully.",
                    data=None,
                )
        except Exception as e:
            return ApiResponse(
                status_code=500,
                is_success=False,
                message=f"Error deleting products: {e}",
                data=None,
            )
