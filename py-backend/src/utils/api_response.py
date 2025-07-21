from pydantic import BaseModel
# from typing import Any


class ApiResponse(BaseModel):
    status_code: int
    is_success: bool
    message: str
    data: object | None = None
