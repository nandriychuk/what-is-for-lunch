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

# Create empty food and nutrient data dictionaries
food_data = {}
nutrient_data = {}

@app.route("/")
def index():
    # print("\n server recognized your request.")
    """Return the homepage."""
    
    response = requests.get('https://api.nal.usda.gov/ndb/V2/reports?ndbno=01009&ndbno=45202763&ndbno=35193&type=f&ds=stat&format=json&api_key=IH2HeHmu6H9xEmUEgOgg9t43Is6rxH3LTz3qIIaV')

    if response:
        response_json = response.json()     # Turn the response to json

        # Add the food data to the dictionary
        food_data['food_id'] = response_json['foods'][0]['food']['desc']['ndbno']
        food_data['food_group'] = response_json['foods'][0]['food']['desc']['fg']
        food_data['food_name'] = response_json['foods'][0]['food']['desc']['name']
        food_data['food_units'] = response_json['foods'][0]['food']['desc']['ru']
        food_data['food_sd'] = response_json['foods'][0]['food']['desc']['sd']

        # Add the nutrient data to the dictionary
        

    else:
        print("didn't get response")

    return jsonify(food_data)#jsonify(response_json)     
    #render_template("index.html")


@app.route("/names")
def names():
    """Return a list of sample names."""

    # Return a list of the column names (sample names)
    return jsonify(list(df.columns)[2:])

if __name__ == "__main__":
    app.run(debug=True)
