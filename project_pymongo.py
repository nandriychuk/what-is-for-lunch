# Module used to connect Python with MongoDb
import pymongo


# from pymongo.mongo_client import MongoClient as mc

# The default port used by MongoDB is 27017
# https://docs.mongodb.com/manual/reference/default-mongodb-port/
conn = 'mongodb://localhost:27017'
client = pymongo.MongoClient(conn)
db = client.project_two


# Query all students
# Here, db.students refers to the collection 'classroom '
nutrition = db.data_csv.find()

# print(list(nutrition))
names = []
# Iterate through each student in the collection
for food in nutrition:
    names.append(food['name'])

print(names)
    
