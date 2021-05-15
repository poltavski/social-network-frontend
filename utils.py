"""Utils module."""
from settings import BACKEND_SERVER
from fastapi import Request
from fastapi.templating import Jinja2Templates
import json
import requests

JINJA_TEMPLATES = Jinja2Templates(directory="templates")


def process_initial(request: Request):
    is_authorized = False
    refresh_r = None
    if request.cookies:
        user_response = requests.get(url=BACKEND_SERVER+"/user/get-current-user", cookies=request.cookies)
        # user_response = requests.get(url=BACKEND_SERVER+"/post/get-feed", cookies=request.cookies)
        if user_response.status_code == 200:
            is_authorized = True
        if user_response.status_code == 422:
            # Signature expired
            refresh_header = {'X-CSRF-TOKEN': request.cookies["csrf_refresh_token"]}
            refresh_r = requests.post(url=BACKEND_SERVER + "/refresh", cookies=request.cookies, headers=refresh_header)
            if refresh_r.status_code == 200:
                is_authorized = True
                user_response = requests.get(url=BACKEND_SERVER + "/user/get-current-user", cookies=refresh_r.cookies)
                if user_response.status_code != 200:
                    is_authorized = False

    if is_authorized:
        data = {"page": "Home page"}
        user_data = json.loads(user_response.text)
        html_response = JINJA_TEMPLATES.TemplateResponse("layout.html", {"request": request, "user_data": user_data, "data": data})
        if refresh_r:
            access_token_cookie = refresh_r.cookies.get("access_token_cookie")
            csrf_access_token = refresh_r.cookies.get("csrf_access_token")
            if access_token_cookie and csrf_access_token:
                html_response.set_cookie(key="access_token_cookie", value=access_token_cookie)
                html_response.set_cookie(key="csrf_access_token", value=csrf_access_token)

        return html_response
    else:
        data = {"page": "Log In"}
        return JINJA_TEMPLATES.TemplateResponse("login.html", {"request": request, "data": data})



def get_page_data(request: Request):
    templates = Jinja2Templates(directory="templates")
    data = {"page": "Home page"}
    return templates.TemplateResponse("layout.html", {"request": request, "data": data})
