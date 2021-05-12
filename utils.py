"""Utils module."""
from settings import BACKEND_SERVER
from fastapi import Request
from fastapi.templating import Jinja2Templates
import requests


def process_initial(request: Request):
    r = requests.get(url=BACKEND_SERVER+"/post/get-feed", cookies=request.cookies)
    print(request.cookies)
    if r.status_code == 422:
        # Signature expired
        refresh_header = {'X-CSRF-TOKEN': request.cookies["csrf_refresh_token"]}
        refersh_r = requests.post(url=BACKEND_SERVER+"/refresh", cookies=request.cookies, headers=refresh_header)
        print(refersh_r.cookies)
        data = {"page": "Home page"}
        templates = Jinja2Templates(directory="templates")
        return templates.TemplateResponse("layout.html", {"request": request, "data": data})
        # return templates.TemplateResponse("layout.html", {"data": data})
        # get_request = requests.get(url=FRONTEND_SERVER+"/", cookies={})
    print(r.text)




def get_page_data(request: Request):
    templates = Jinja2Templates(directory="templates")
    data = {"page": "Home page"}
    return templates.TemplateResponse("layout.html", {"request": request, "data": data})
