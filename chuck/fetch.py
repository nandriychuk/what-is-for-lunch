# Program designed to fetch data from USDA, filter it, and upload it to a database

import os

import pandas as pd
import numpy as np

import requests
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

# try to get a response back from the database
# response = requests.get('https://api.nal.usda.gov/ndb/search/?format=json&q=butter&sort=n&max=25&offset=0&api_key=DEMO_KEY ')
# if response:
#     print('got response')
# else:
#     print("didn't get response")


@app.route("/")
def index():
    # print("\n server recognized your request.")
    """Return the homepage."""
    
    response = requests.get('https://api.nal.usda.gov/ndb/V2/reports?ndbno=01009&ndbno=45202763&ndbno=35193&type=f&format=json&api_key=IH2HeHmu6H9xEmUEgOgg9t43Is6rxH3LTz3qIIaV')

    if response:
        response_json = response.json()     # Turn the response to json

    else:
        print("didn't get response")

    return  'got response'   #render_template("index.html")


@app.route("/names")
def names():
    """Return a list of sample names."""

    # Return a list of the column names (sample names)
    return jsonify(list(df.columns)[2:])

if __name__ == "__main__":
    app.run(debug=True)
