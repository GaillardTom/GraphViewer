import sys 
from pydoc import doc
from matplotlib import collections
import pymongo
import pandas as pd
import matplotlib.pyplot as plt
import numpy as np
from bson.objectid import ObjectId
import datetime

FILTER = sys.argv[1]
TITLE  = sys.argv[2]
USERID = ObjectId(sys.argv[3])
global path

def ConnToDb():
    myClient = pymongo.MongoClient(
        "mongodb://cfortier:cfortier123@cluster0-shard-00-00.gjdrt.mongodb.net:27017,cluster0-shard-00-01.gjdrt.mongodb.net:27017,cluster0-shard-00-02.gjdrt.mongodb.net:27017/test?authSource=admin&replicaSet=atlas-e0cio3-shard-0&readPreference=primary&ssl=true"
    )
    mydb = myClient["sample_supplies"]

    collection = mydb["sales"]
    return collection
def InsertToGraphDB(): 
    e = datetime.datetime.now()
    global path
    myClient = pymongo.MongoClient(
         "mongodb://localhost:27017"
    )
    mydb = myClient["graphViewerUsers"]
    coll = mydb['graph']
    test = coll.insert_one({"userID": USERID, "title": TITLE, "timeCreated": e.strftime("%Y-%m-%d %H:%M:%S")})
    print(test.inserted_id)
    path = f'D:/Winter2022/GraphViewer/server/uploads/{test.inserted_id}.png'
    return ObjectId(test.inserted_id), coll
    


def FetchData():
    coll = ConnToDb()
    # df = pd.DataFrame(coll)
    doc = list(
        coll.aggregate([
        {"$match": {"storeLocation": FILTER}},
        {"$unwind": "$items"},
        {"$group": {"_id": "$items.name", "itemsQuantity": {"$sum":  "$items.quantity"}}}]
    ))
    return doc

def makePie(doc, userID, coll):
    global path
    ypoints = doc["itemsQuantity"] 
    label = doc["_id"]
    plt.bar(label, ypoints)
    plt.xticks(rotation=45)
    plt.title(f"{TITLE} \n{FILTER}")
    
    updateDoc = coll.update_one({"_id": userID}, {"$set": {"graphLocation": path}})
    print(updateDoc.matched_count)
    plt.savefig(path)

def main(): 
    print(sys.argv[1])
    ConnToDb()
    coll = FetchData()
    salesDF = pd.DataFrame(coll)
    print(salesDF)
    userID, collection = InsertToGraphDB()
    makePie(salesDF, userID, collection)

if __name__ == "__main__":
    main()