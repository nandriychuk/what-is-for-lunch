from flask import Flask, render_template, redirect
from flask import Flask, jsonify, render_template
from flask_pymongo import PyMongo
import os

import pandas as pd
import numpy as np

# Create an instance of Flask
app = Flask(__name__)

# Use PyMongo to establish Mongo connection
mongo = PyMongo(app, uri="mongodb://localhost:27017/project_two")


# Route to render index.html template using data from Mongo
@app.route("/")
def home():

    # Find one record of data from the mongo database
    destination_data = mongo.db.data_csv.find({'id': 27481})

    # Return template and data
    return render_template("index.html", mars=destination_data[0]['name'])

@app.route("/names")
def names():
    """Return a list of sample names."""

    # Use Pandas to perform the sql query
    stmt = mongo.db.data_api.distinct( "category" )
    

    # Return a list of the column names (sample names)
    return jsonify(stmt)

@app.route("/names/<sample>")
def subnames(sample):
    """Return a list of sample names."""
    
    # Use Pandas to perform the sql query
    stmt = mongo.db.data_api.find({'category':sample}).distinct( "name" )
    

    # Return a list of the column names (sample names)
    return jsonify(stmt)

if __name__ == "__main__":
    app.run(debug=True)
