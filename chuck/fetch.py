# Program designed to fetch data from USDA, filter it, and upload it to a database

import os

import pandas as pd
import numpy as np

import requests


from flask import Flask, jsonify, render_template
from flask_pymongo import PyMongo

app = Flask(__name__)

# Create the database configuration
app.config['MONGO_DBNAME'] ='project_2'
app.config['MONGO_URI'] = 'mongodb://localhost:27017/project_2'

# Connect to the database
mongo = PyMongo(app)
# conn = 'mongodb://localhost:27017/'
# client = mongo.MongoClient(conn)
# db = client.lunch_app


# Create empty food and nutrient data dictionaries



@app.route("/")
def index():
    # print("\n server recognized your request.")
    """Return the homepage."""
    
    response = requests.get('https://api.nal.usda.gov/ndb/V2/reports?ndbno=01009&ndbno=45202763&ndbno=35193&type=f&ds=stat&format=json&api_key=IH2HeHmu6H9xEmUEgOgg9t43Is6rxH3LTz3qIIaV')


    nutrients = []

    if response:
        response_json = response.json()     # Turn the response to json

        # Add the food data to the dictionary

        food_data = {}

        food_data['food_id'] = response_json['foods'][0]['food']['desc']['ndbno']
        food_data['food_group'] = response_json['foods'][0]['food']['desc']['fg']
        food_data['food_name'] = response_json['foods'][0]['food']['desc']['name']
        food_data['food_units'] = response_json['foods'][0]['food']['desc']['ru']
        food_data['food_sd'] = response_json['foods'][0]['food']['desc']['sd']



        # Add the nutrient data to the dictionary
        for i in range(len(response_json['foods'][0]['food']['nutrients'])):
            nutrient_data = {}
            nutrient_data['nut_name'] = response_json['foods'][0]['food']['nutrients'][i]['name']
            nutrient_data['nut_id'] = response_json['foods'][0]['food']['nutrients'][i]['nutrient_id']
            nutrient_data['unit'] = response_json['foods'][0]['food']['nutrients'][i]['unit']
            nutrient_data['value'] = response_json['foods'][0]['food']['nutrients'][i]['value']
            
            # Add nutrient data objects to the database
            print(nutrient_data)
            nutrients.append(nutrient_data)
            # print('This went to the database: ', nutrient_data)
         
            #print(nutrient_data)

    else:
        print("didn't get response")


    mongo.db.nutrition.insert_one({'nutrients': nutrients})
    
    
    # return  jsonify(response_json) 
    # return  jsonify(nutrients)  
    return  jsonify(nutrients)
    # return  render_template("index.html")    
    



@app.route("/names")
def names():
    """Return a list of sample names."""

    # Return a list of the column names (sample names)
    return jsonify(list(df.columns)[2:])

if __name__ == "__main__":
    app.run(debug=True)
