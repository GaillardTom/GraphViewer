import sys 
from pydoc import doc
from pkg_resources import CHECKOUT_DIST
import pymongo
import pandas as pd
import matplotlib.pyplot as plt
import numpy as np
from bson.objectid import ObjectId
import datetime


global path

FILTER = sys.argv[1]
TITLE = sys.argv[2]
USERID = ObjectId(sys.argv[3])
TYPE = "Age group in " + FILTER
def ConnToDb():
    myClient = pymongo.MongoClient(
        "mongodb://cfortier:cfortier123@cluster0-shard-00-00.gjdrt.mongodb.net:27017,cluster0-shard-00-01.gjdrt.mongodb.net:27017,cluster0-shard-00-02.gjdrt.mongodb.net:27017/test?authSource=admin&replicaSet=atlas-e0cio3-shard-0&readPreference=primary&ssl=true"
    )
    mydb = myClient["sample_supplies"]

    collection = mydb["sales"]
    return collection
def InsertToGraphDB(): 
    global path
    e = datetime.datetime.utcnow()

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
        {"$unwind": "$customer"}, {"$group": { "_id": "$customer.age", "count": {"$sum": 1}}}
        ]
    ))
    return doc

def ReturnGoodAge(df): 
    
    ageRange = { "1-18": 0, "18-30": 0, "30-60": 0, "60+": 0}
    
    for age, count in df.iterrows():  
        if(count['_id'] < 18 and count['_id'] >= 1 ):
            ageRange["1-18"] += count['count']
        elif(count['_id']< 30 and count['_id'] >= 18):
            ageRange["18-30"] += count['count']
        elif(count['_id'] < 60 and count['_id'] >= 30):
            ageRange["30-60"] += count['count']
        elif(count['_id'] >= 60):
            ageRange["60+"] += count['count']
    return ageRange

def MakeBarGraph(ageRange, objectID, coll) :
    global path
    plt.suptitle(TITLE)
    plt.title(FILTER)
    ages = list(ageRange.keys())
    values = list(ageRange.values())
    plt.ylabel("Age Range")
    plt.xlabel("Values")
    plt.barh(ages, values)

    updateDoc = coll.update_one({"_id": objectID}, {"$set": {"graphLocation": path}})
    plt.savefig("../server/public"+path)
    
def main(): 
    ConnToDb()
    coll = FetchData()
    salesDF = pd.DataFrame(coll)
    
    ageRange = ReturnGoodAge(salesDF)
    userID, coll = InsertToGraphDB()
    MakeBarGraph(ageRange,userID, coll)
if __name__ == "__main__":
    main()