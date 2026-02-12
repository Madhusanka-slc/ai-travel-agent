from fastapi import FastAPI, Depends, HTTPException
from typing import List
from fastapi.middleware.cors import CORSMiddleware
from backend.env import config
from backend.db.connect import get_db_session, SessionLocal
from backend.db.schemas import FlightPriceSchema, FlightPriceDetailSchema
from backend.db import utils as db_utils

DEBUG = config("DEBUG", cast=bool, default=False)
FRONTEND_ORIGINS = config("FRONTEND_ORIGINS", cast=lambda x: [s.strip() for s in x.split(",")], default="http://localhost:3000")


app = FastAPI()
# Python requests (e.g., from Jupyter) don't need CORS because they run server-side, not in a browser.
# Browser requests (e.g., from Next.js) need CORS because browsers enforce cross-origin security.

app.add_middleware(
    CORSMiddleware,
    allow_origins=FRONTEND_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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

@app.get("/flights/", response_model=List[FlightPriceSchema])
def read_flight_prices(offset: int = 0, limit: int = 100, db_session: SessionLocal = Depends(get_db_session)):
    return db_utils.get_flight_prices(db_session, offset=offset, limit=limit)



@app.get("/flights/{flight_price}", response_model=FlightPriceDetailSchema)
def read_flight_prices(flight_price: int, db_session: SessionLocal = Depends(get_db_session)):
    db_flight_value =  db_utils.get_flight_price(db_session, flight_price)
    if db_flight_value is None:
        raise HTTPException(status_code=404, detail="Flight price not found")
    return db_flight_value