"""Utils module."""
from fastapi import Request
from fastapi.templating import Jinja2Templates


def get_page_data(request: Request):
    templates = Jinja2Templates(directory="templates")
    data = {"page": "Home page"}
    return templates.TemplateResponse("layout.html", {"request": request, "data": data})
