import datetime as dt
import numpy as np
import pandas as pd
from sqlalchemy import create_engine, inspect
from flask import Flask, jsonify
import json

engine = create_engine("sqlite:///Data/hawaii.sqlite")

app = Flask(__name__)

@app.route("/")
def home():
   return (
        f"<h1>Welcome to the Hawaii Weather Data API!</h1><br/>"
        f"Available Routes:<br/>"
        f"/api/v1.0/precipitation<br/>"
        f"/api/v1.0/stations<br/>"
        f"/api/v1.0/tobs<br/>"
        f"/api/v1.0/start<br/>"
        f"/api/v1.0/start/end"
    )

@app.route("/api/v1.0/precipitation")
def get_precipitation():
    query = """
            SELECT 
                date,
                prcp
            FROM
                measurement
            """
    conn = engine.connect()
    df = pd.read_sql(query, con=conn)
    conn.close()
    return jsonify(json.loads(df.to_json(orient="records")))

@app.route("/api/v1.0/stations")
def get_stations():
    query = """
            SELECT
                station
            FROM
                station
            """
    conn = engine.connect()
    df = pd.read_sql(query, con=conn)
    conn.close()
    return jsonify(json.loads(df.to_json(orient="records")))

@app.route("/api/v1.0/tobs")
def get_tobs():
    query = """
            SELECT
                date,
                tobs
            FROM
                measurement
            WHERE
                date >= (
                    SELECT
                        date(MAX(date), '-365 day')
                    FROM
                        measurement
                        )
            AND
                station = (
                            SELECT
                                s.station
                            FROM
                                station s
                            JOIN measurement m on s.station = m.station
                            GROUP BY s.station
                            ORDER BY
                                count(*) desc
                            LIMIT 1
                            )
            ORDER BY
                date
            """
    conn = engine.connect()
    df = pd.read_sql(query, con=conn)
    conn.close()
    return jsonify(json.loads(df.to_json(orient="records")))

if __name__ == "__main__":
    app.run(debug=True)