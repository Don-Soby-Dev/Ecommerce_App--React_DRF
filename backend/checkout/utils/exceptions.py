from rest_framework.views import exception_handler
from rest_framework.response import Response
from rest_framework import status


def custom_exception_handler(exc, context):
    response = exception_handler(exc, context)

    if response is not None:
        error_code = "ERROR"
        message = "An error occurred."
        fields = None

        if response.status_code == status.HTTP_400_BAD_REQUEST:
            error_code = "VALIDATION_ERROR"

            if isinstance(response.data, dict):
                fields = response.data

                # Dynamically extract the first error message for the top-level 'message' field
                first_key = next(iter(response.data))
                first_err = response.data[first_key]

                if isinstance(first_err, list) and len(first_err) > 0:
                    message = str(first_err[0])
                elif isinstance(first_err, str):
                    message = first_err
                else:
                    message = "Invalid input data."

            elif isinstance(response.data, list):
                fields = {"non_field_errors": response.data}
                message = (
                    str(response.data[0])
                    if len(response.data) > 0
                    else "Invalid input data."
                )

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

        elif response.status_code == status.HTTP_404_NOT_FOUND:
            error_code = "NOT_FOUND"
            message = response.data.get("detail", "Resource not found.")

        else:
            if isinstance(response.data, dict) and "detail" in response.data:
                message = str(response.data["detail"])

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
