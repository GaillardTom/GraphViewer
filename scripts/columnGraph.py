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
TYPE = "Items sold in " + FILTER
global path

def ConnToDb():
    myClient = pymongo.MongoClient(
        "mongodb://cfortier:cfortier123@cluster0-shard-00-00.gjdrt.mongodb.net:27017,cluster0-shard-00-01.gjdrt.mongodb.net:27017,cluster0-shard-00-02.gjdrt.mongodb.net:27017/test?authSource=admin&replicaSet=atlas-e0cio3-shard-0&readPreference=primary&ssl=true"
    )
    mydb = myClient["sample_supplies"]

    collection = mydb["sales"]
    return collection
def InsertToGraphDB(): 
    e = datetime.datetime.utcnow()
    global path
    myClient = pymongo.MongoClient(
         "mongodb://localhost:27017"
    )
    mydb = myClient["graphViewerUsers"]
    coll = mydb['graph']
    test = coll.insert_one({"userID": USERID, "title": TITLE, "date": e, "type": TYPE})
    print(test.inserted_id)
    path = f'/{test.inserted_id}.png'
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
    plt.tight_layout(pad=1)
    updateDoc = coll.update_one({"_id": userID}, {"$set": {"graphLocation": path}})
    plt.savefig("../server/public"+path)

def main(): 
    ConnToDb()
    coll = FetchData()
    salesDF = pd.DataFrame(coll)
    userID, collection = InsertToGraphDB()
    makePie(salesDF, userID, collection)

if __name__ == "__main__":
    main()