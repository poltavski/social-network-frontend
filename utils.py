from fastapi import Form
from .settings import BACKEND_SERVER

def auth_user(
    username: str = Form(...),
    email: str = Form(...),
    first_name: str = Form(...),
    last_name: str = Form(...),
    password: str = Form(...),
    description: str = Form(None),
):
    """Auth user.
    Schema:
        {
        "username":form.elements.username.value,
        "email":form.elements.email.value,
        "first_name":form.elements.name.value,
        "last_name": form.elements.surname.value,
        "description": form.elements.description.value,
        "password": form.elements.password.value,
    }
    Args:
        data:

    Returns:
    """
    # Check user auth
    url = BACKEND_SERVER + "/token"

    return True