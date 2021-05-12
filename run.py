from fastapi import FastAPI, Request, Response
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from utils import get_page_data, process_initial
import components
import uvicorn

app = FastAPI()
templates = Jinja2Templates(directory="templates")
app.mount("/static", StaticFiles(directory="static"), name="static")


@app.get("/", response_class=HTMLResponse)
async def home(request: Request, response: Response):
    # Expect requests with cookies
    response.set_cookie(key="fakesession", value="fake-cookie-session-value")
    return process_initial(request)


@app.post("/cookie-and-object", response_class=HTMLResponse)
def create_cookie(request: Request, response: HTMLResponse):
    response.set_cookie(key="COOKIEOBJECT3", value="COOKIEOBJECT-VALUE2")
    data = {"page": "Home page"}
    return templates.TemplateResponse("layout.html", {"request": request, "data": data})

    # return process_initial(request)
    # return {"message": "Come to the dark side, we have cookies"}


@app.get("/page", response_class=HTMLResponse)
async def home(request: Request):
    # Expect requests with cookies
    return get_page_data(request)


@app.get("/{page_name}", response_class=HTMLResponse)
async def page(request: Request, page_name: str):
    return templates.TemplateResponse(
        f"{page_name}",
        {
            "request": request,
            "service_parts": components.SERVICES_CARDS,
            "services_widget": components.SERVICES_WIDGET,
        },
    )


if __name__ == "__main__":
    uvicorn.run("run:app", host="127.0.0.1", port=8050, log_level="info")
