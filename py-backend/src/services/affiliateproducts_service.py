from sqlalchemy.exc import IntegrityError, OperationalError, DatabaseError
from sqlmodel import create_engine, Session, select
from sqlalchemy import func
from uuid import UUID
from collections.abc import Sequence
from ..models.affliateproducts_model import Product, Cart
from datetime import datetime, timezone
from ..db.postgresDb import DATABASE_URL
from ..utils.api_response import ApiResponse


# Ensure DATABASE_URL is a string
engine = create_engine(str(DATABASE_URL))


class AffiliateProductsService:
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
    def get_products() -> ApiResponse:
        try:
            with Session(engine) as session:
                product = session.exec(select(Product)).all()
                return ApiResponse(
                    status_code=200,
                    is_success=True,
                    message="Products fetched successfully.",
                    # data=[p.model_dump() for p in product],
                    data=product,
                )
        except Exception as e:
            return ApiResponse(
                status_code=500,
                is_success=False,
                message=f"Error fetching products: {e}",
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

    @staticmethod
    def get_cart_items(user_id: int) -> ApiResponse:
        try:
            with Session(engine) as session:
                user_cart: Cart | None = session.get(Cart, user_id)

                if not user_cart:
                    return ApiResponse(
                        status_code=404,
                        is_success=False,
                        message="Cart not found.",
                        data=None,
                    )

                product_ids: list[str] = user_cart.product_ids

                if not product_ids:
                    return ApiResponse(
                        status_code=404,
                        is_success=False,
                        message="No products found in cart.",
                        data=None,
                    )

                # Fetch the products using the product IDs
                products_in_cart: Sequence[Product] = session.exec(
                    select(Product).where(Product.id.in_(product_ids))  # pyright: ignore[reportAttributeAccessIssue]
                ).all()

                print(f"✅ Fetched {len(products_in_cart)} products from the cart.")

                return ApiResponse(
                    status_code=200,
                    is_success=True,
                    message="Cart items fetched successfully.",
                    data=products_in_cart,
                )
        except Exception as e:
            return ApiResponse(
                status_code=500,
                is_success=False,
                message=f"Error fetching cart items for user: {e}",
                data=None,
            )

    @staticmethod
    def add_remove_product_from_cart(user_id: str, product_id: str) -> ApiResponse:
        try:
            with Session(engine) as session:
                # Validate product exists
                product = session.get(Product, product_id)
                if not product:
                    raise ValueError(f"Product not found with ID: {product_id}")

                # Fetch user's cart (single row per user)
                user_cart = session.get(Cart, user_id)

                if user_cart:
                    if product_id in user_cart.product_ids:
                        user_cart.product_ids = [
                            pid for pid in user_cart.product_ids if pid != product_id
                        ]
                        cart_action_status = "Product removed from cart"
                    else:
                        user_cart.product_ids = user_cart.product_ids + [product_id]
                        cart_action_status = "Product added to cart"

                    user_cart.updated_at = datetime.now(timezone.utc)
                    session.add(user_cart)
                    session.commit()
                else:
                    cart = Cart(
                        user_id=user_id,
                        product_ids=[product_id],
                        updated_at=datetime.now(timezone.utc),
                    )
                    session.add(cart)
                    session.commit()
                    cart_action_status = "New cart created and product added."

                return ApiResponse(
                    status_code=200,
                    is_success=True,
                    message=cart_action_status,
                    data=None,
                )
        except Exception as e:
            return ApiResponse(
                status_code=400,
                is_success=False,
                message=f"Error adding/removing product from cart: {e}",
                data=None,
            )
