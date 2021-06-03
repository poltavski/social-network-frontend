from fastapi import FastAPI, Request, Response
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from utils import get_page_data, process_initial
import uvicorn

app = FastAPI()
templates = Jinja2Templates(directory="templates")
app.mount("/static", StaticFiles(directory="static"), name="static")


@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    # Expect requests with cookies
    return process_initial(request)


@app.get("/page", response_class=HTMLResponse)
async def home(request: Request):
    # Expect requests with cookies
    return get_page_data(request)


if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8050, log_level="info")
