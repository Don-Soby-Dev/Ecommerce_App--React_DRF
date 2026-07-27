# utils/exceptions.py
from rest_framework.views import exception_handler
from rest_framework.response import Response
from rest_framework import status


def custom_exception_handler(exc, context):
    # Call DRF's default exception handler first to get the standard error response
    response = exception_handler(exc, context)

    if response is not None:
        error_code = "ERROR"
        message = "An error occurred."
        fields = None

        # Handle DRF Validation Errors (400 Bad Request)
        if response.status_code == status.HTTP_400_BAD_REQUEST:
            error_code = "VALIDATION_ERROR"
            message = "Invalid input data."
            # response.data can be a dict of field errors or a list
            if isinstance(response.data, dict):
                fields = response.data
            else:
                fields = {"non_field_errors": response.data}

        # Handle Authentication Errors (401 / 403)
        elif response.status_code == status.HTTP_401_UNAUTHORIZED:
            error_code = "UNAUTHORIZED"
            message = response.data.get(
                "detail", "Authentication credentials were not provided."
            )
        elif response.status_code == status.HTTP_403_FORBIDDEN:
            error_code = "FORBIDDEN"
            message = response.data.get(
                "detail", "You do not have permission to perform this action."
            )

        # Handle Not Found Errors (404)
        elif response.status_code == status.HTTP_404_NOT_FOUND:
            error_code = "NOT_FOUND"
            message = response.data.get("detail", "Resource not found.")

        # Any other standard DRF errors
        else:
            if isinstance(response.data, dict) and "detail" in response.data:
                message = str(response.data["detail"])

        # Reconstruct the payload to match your required error format
        error_payload = {
            "success": False,
            "error": {
                "code": error_code,
                "message": message,
            },
        }

        if fields:
            error_payload["error"]["fields"] = fields

        response.data = error_payload

    return response
