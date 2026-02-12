from pydantic import BaseModel, ConfigDict
from datetime import date
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
