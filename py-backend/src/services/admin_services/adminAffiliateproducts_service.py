from typing import Any
from pydantic import BaseModel
from sqlalchemy.exc import IntegrityError, OperationalError, DatabaseError
from sqlmodel import create_engine, Session, select
from sqlalchemy import func
from uuid import UUID
from ...models.affliateproducts_model import Product, Cart
from datetime import datetime, timezone
from ...db.postgresDb import DATABASE_URL
from ...utils.api_response import ApiResponse


# Ensure DATABASE_URL is a string
engine = create_engine(str(DATABASE_URL))


class AdminAffiliateProductsService:
    @staticmethod
    def add_all_products() -> ApiResponse:
        from ...routes.productsarr import allProductsArr

        try:
            class AffiliateLink(BaseModel):
                platform: str
                link: str
                price: float

            # transformed_products: list[Any] = []
            transformed_products: list[dict[str, Any]] = []

            with Session(engine) as session:
                for product_data in allProductsArr:
                    # if not isinstance(product_data, AllProductsTypes):
                    #   raise TypeError("Product data must be of type AllProductsTypes.")
                    if product_data.affiliateLinks:
                        if isinstance(product_data.affiliateLinks, list):
                            print(
                                "Affiliate links for product is list not parsing this one "
                            )
                            continue

                    if product_data.affiliateLink and product_data.price:
                        LinksDetails = AffiliateLink(
                            platform="amazon"
                            if "amzn" in product_data.affiliateLink
                            else "not-available",
                            link=product_data.affiliateLink,
                            price=product_data.price
                            if "amzn" in product_data.affiliateLink
                            else 0.0,
                        )

                        # product_dict = product_data.model_dump()
                        # del product_dict["price"]
                        # del product_dict["affiliateLink"]

                        # print(LinksDetails.model_dump())
                        # print(LinksDetails.model_dump_json())
                        affiliateLinks = LinksDetails.model_dump()
                        # print(affiliateLinks)
                        new_product_dict = product_data.model_dump(
                            exclude={"price", "affiliateLink"}
                        )

                        # keys_to_remove = ["price", "affiliateLink"]
                        # new_product = {
                        #     k: v
                        #     for k, v in product_data_dict.items()
                        #     if k not in keys_to_remove
                        # }
                        new_product_dict["affiliateLinks"] = [affiliateLinks]
                        # print(new_product)

                        transformed_products.append(new_product_dict)
                        # print(transformed_products)

                for new_product_dict in transformed_products:
                    product = Product.model_validate(new_product_dict)
                    session.add(product)
                    # print(product)
                    # print("==============================================")

                session.commit()
                return ApiResponse(
                    status_code=200,
                    is_success=True,
                    message="All products added successfully.",
                    data=transformed_products,
                )
        except IntegrityError as e:
            return ApiResponse(
                status_code=400,
                is_success=False,
                message=f"Integrity error: {e}",
                data=None,
            )
        except Exception as e:
            return ApiResponse(
                status_code=500,
                is_success=False,
                message=f"Error adding all products: {e}",
                data=None,
            )

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
