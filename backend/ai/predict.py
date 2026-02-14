from backend.env import config
import requests
import json, re

MINDSDB_BASE_URL = "http://127.0.0.1:47334/api"


def mindsdb_query(sql_query: str):
    endpoint = "/sql/query"
    url = f"{MINDSDB_BASE_URL}{endpoint}"

    headers = {"Content-Type": "application/json"}

    try:
        response = requests.post(
            url,
            json={"query": sql_query},
            headers=headers,
            timeout=10,
        )
        response.raise_for_status()
        return response.json()

    except requests.exceptions.RequestException as e:
        print("MindsDB request failed:", e)
        return None


def predict_query(
    flightDate="2022-04-21",
    startingAirport="SFO",
    isNonStop=1,
    isBasicEconomy=0,
    isRefundable=0,
    destinationAirport="BOS",
    raw_request=False,
    **kwargs,

):
    sql_query = f"""
        SELECT CONCAT(CAST(random() * 1000000 as INT)) as requestID,m.flightDate as date, m.segmentsAirlineName as airline, m.isNonStop as nonStop, m.isBasicEconomy as basic, m.isRefundable as refundable,
               m.totalFare as price
        FROM mindsdb.flight_price_predictor AS m
        JOIN ai_travel_agent.ai_travel_prices.flight_prices AS t
        WHERE t.flightDate > '{flightDate}'
        AND t.startingAirport = '{startingAirport}'
        AND t.isBasicEconomy = {isBasicEconomy}
        AND t.isRefundable = {isRefundable}
        AND t.isNonStop = {isNonStop}
        AND t.destinationAirport = '{destinationAirport}' LIMIT 5;
    """

    print("Executing SQL:")
    print(sql_query)

    result = mindsdb_query(sql_query)

    if result is None:
        raise Exception("No response received from MindsDB")

    if raw_request:
        return result

    columns = result.get("column_names")
    dataset = result.get("data")

    if not columns or not dataset:
        return []

    web_ready_data = [
        dict(zip(columns, row))
        for row in dataset
    ]

    return web_ready_data


def recommended_flight(
    user_data={},
    forecast_data=[],
    question="Respond with JSON Only with given column names, what is the best flight option?",
    raw_request=False,
    **kwargs,
):
    context = {"options": forecast_data, "preferences": user_data}
    context_data = json.dumps(context)

    # Escape single quotes to prevent SQL break
    safe_context = context_data.replace("'", "''")
    safe_question = question.replace("'", "''")

    sql_query = f"""
    SELECT answer
    FROM ai_travel_agent
    WHERE question = '{safe_question}'
    AND context = '{safe_context}'
    LIMIT 1;
    """

    # print("Executing SQL:")
    # print(sql_query)

    result = mindsdb_query(sql_query)

    if result is None:
        raise Exception("No response received from MindsDB")

    if raw_request:
        return result

    columns = result.get("column_names")
    dataset = result.get("data")

    if not columns or not dataset:
        return []

    answer = dataset[0][0]

    json_match = re.search(r'\{.*\}', answer, re.DOTALL)
    
    if json_match:
        return json_match.group(0)
    
    return answer
