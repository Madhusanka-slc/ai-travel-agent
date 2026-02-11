CREATE MODEL mindsdb.house_sales_predictor
FROM housing_prices_conn
  (SELECT * FROM housing_db.kaggle_house_data)
PREDICT price
ORDER BY date
GROUP BY type, bedrooms
WINDOW 8   
HORIZON 4;  

DESCRIBE PREDICTOR mindsdb.house_sales_predictor;



SELECT * FROM housing_prices_conn.kaggle_house_data ORDER BY date DESC

SELECT m.date as futurem.price as forecast, m.price_confidence as confidence  FROM mindsdb.house_sales_predictor AS m
JOIN housing_prices_conn.kaggle_house_data AS t
WHERE t.date > LATEST
AND t.type = "unit"
AND t.bedrooms = 2;


CREATE MODEL mindsdb.house_sales_predictor_two_years
FROM housing_prices_conn
  (SELECT * FROM housing_db.kaggle_house_data)
PREDICT price
ORDER BY date
GROUP BY type, bedrooms
WINDOW 12   
HORIZON 8;  

DESCRIBE PREDICTOR mindsdb.house_sales_predictor_two_years;


SELECT * FROM housing_prices_conn.kaggle_house_data ORDER BY date DESC

SELECT m.date as futurem.price as forecast, m.price_confidence as confidence  FROM mindsdb.house_sales_predictor_two_years AS m
JOIN housing_prices_conn.kaggle_house_data AS t
WHERE t.date > LATEST
AND t.type = "unit"
AND t.bedrooms = 2;

SELECT * FROM housing_prices_conn.kaggle_house_data ORDER BY date DESC;


SELECT m.date as futurem.price as forecast, m.price_confidence as confidence  FROM mindsdb.house_sales_predictor_two_years AS m
JOIN housing_prices_conn.kaggle_house_data AS t
WHERE t.date > LATEST
AND t.type = "house"
AND t.bedrooms = 3;


-- ######################################


-- FIXED ISSUE - model not create due to missing nltk punkt_tab package, now flight_price_predictor is created successfully and predictions are made without error.
-- docker exec -it mindsdb-cloud /bin/bash
-- python
-- import nltk
-- nltk.download('punkt_tab')
-- exit()
DROP MODEL mindsdb.flight_price_predictor;
SHOW MODELS;


CREATE MODEL mindsdb.flight_price_predictor
FROM ai_travel_agent
  (SELECT * FROM ai_travel_prices.flight_prices)
PREDICT totalFare
ORDER BY flightDate
GROUP BY startingAirport, destinationAirport
WINDOW 2
HORIZON 1;


DESCRIBE PREDICTOR mindsdb.flight_price_predictor;

SELECT *  FROM mindsdb.flight_price_predictor AS m
JOIN ai_travel_agent.ai_travel_prices.flight_prices AS t
WHERE t.flightDate > LATEST
AND t.startingAirport = "ORD"
AND t.destinationAirport = "JFK";



CREATE MODEL mindsdb.flight_price_predictor
FROM ai_travel_agent
  (SELECT * FROM ai_travel_prices.flight_prices)
PREDICT totalFare
ORDER BY flightDate
GROUP BY startingAirport, destinationAirport, isBasicEconomy, isRefundable, isNonStop, segmentsAirlineName
WINDOW 30 
HORIZON 10;

DESCRIBE PREDICTOR mindsdb.flight_price_predictor;

SELECT *  FROM mindsdb.flight_price_predictor AS m
JOIN ai_travel_agent.ai_travel_prices.flight_prices AS t
WHERE t.flightDate > "2022-04-21"
AND t.startingAirport = "ORD"
AND t.isNonStop = 1
AND t.destinationAirport = "JFK";