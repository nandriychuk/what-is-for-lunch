from flask import Flask, render_template, jsonify 
# from flask import Flask, jsonify, render_template, redirect
# from flask_pymongo import PyMongo
# import os

# import pandas as pd
# import numpy as np

# # Create an instance of Flask
# app = Flask(__name__)

# # Use PyMongo to establish Mongo connection
# mongo = PyMongo(app, uri="mongodb://localhost:27017/project_two")


# Import our pymongo library, which lets us connect our Flask app to our Mongo database.
import pymongo

# Create an instance of our Flask app.
app = Flask(__name__)

# Create connection variable
conn = 'mongodb://localhost:27017'

# Pass connection to the pymongo instance.
client = pymongo.MongoClient(conn)

# Connect to a database. Will create one if not already available.
db = client.project_two

# Route to render index.html template using data from Mongo
@app.route("/")
def home():

    # Find one record of data from the mongo database
    destination_data = list(db.data_api.find({'id': 11011}))
    print(destination_data)

    # Return template and data
    return render_template("index.html")#, mars=destination_data[0]['name'])

@app.route("/names")
def names():
    """Return a list of sample names."""

    # Use Pandas to perform the sql query
    stmt = db.data_api.distinct( "category" )
    

    # Return a list of the column names (sample names)
    return jsonify(stmt)

@app.route("/names/<sample>")
def subnames(sample):
    """Return a list of sample names."""
    
    # Use Pandas to perform the sql query
    stmt = mongo.db.data_api.find({'category':sample}).distinct( "name" )
    

    # Return a list of the column names (sample names)
    return jsonify(stmt)

# Create flask endpoint with nutrient data for the chosen food
@app.route("/nutevalues")
def nutes():
    """Return a dictionary of nutrient data."""
    # Create the dictionary to hold the nutrient data
    nut_data = {}

    # Use mongo clients to perform the database query
    response = list(db.data_api.find({'id':'11011'}))
    for obj in response:
        nut_data[obj['nutrient']] = {'value':obj['value'] , 'unit':obj['unit']}

    return jsonify(nut_data)

if __name__ == "__main__":
    app.run(debug=True)
