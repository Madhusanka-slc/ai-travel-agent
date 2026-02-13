from pydantic import BaseModel, Field, ConfigDict
from datetime import date



class AirportSchema(BaseModel):
    name: str = Field(alias="label")
    iata: str = Field(alias="value")

    model_config = ConfigDict(
        populate_by_name=True,
        from_attributes=True
    )



class PredictSchema(BaseModel):
    startingAirport: str
    destinationAirport: str
    flightDate: date = "2022-04-21"
    isBasicEconomy: bool = False
    isRefundable: bool = False
    isNonStop: bool = True

    # model_config = ConfigDict(
    #     from_attributes=True
    # )


class FlightPriceSchema(BaseModel):
    id: int
    flightDate: date
    startingAirport: str
    destinationAirport: str
    # isBasicEconomy: bool
    # isRefundable: bool
    # isNonStop: bool
    segmentsAirlineName: str
    totalFare: int

    model_config = ConfigDict(
        from_attributes=True
    )


class FlightPriceDetailSchema(BaseModel):
    id: int
    flightDate: date
    startingAirport: str
    destinationAirport: str
    isBasicEconomy: bool
    isRefundable: bool
    isNonStop: bool
    segmentsAirlineName: str
    totalFare: int

    model_config = ConfigDict(
        from_attributes=True
    )
