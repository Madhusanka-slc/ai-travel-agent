from fastapi import FastAPI
from backend.env import config

DEBUG = config("DEBUG", cast=bool, default=False)

app = FastAPI()

@app.get("/hello-world")
def read_hello_world():
    return {

        "hello": "read-world",
        "Debug": DEBUG
    }

@app.post("/hello-world")
def write_hello_world():
    return {

        "hello": "write-world",
        "Debug": DEBUG
    }