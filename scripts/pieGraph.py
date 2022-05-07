import sys 
from pydoc import doc
import pymongo
import pandas as pd
import matplotlib.pyplot as plt
import numpy as np
from bson.objectid import ObjectId
import datetime

FILTER = sys.argv[1]
TITLE = sys.argv[2]
USERID = ObjectId(sys.argv[3])
TYPE = "Gender difference in " + FILTER
global path
def ConnToDb():
    myClient = pymongo.MongoClient(
         "mongodb://cfortier:cfortier123@cluster0-shard-00-00.gjdrt.mongodb.net:27017,cluster0-shard-00-01.gjdrt.mongodb.net:27017,cluster0-shard-00-02.gjdrt.mongodb.net:27017/test?authSource=admin&replicaSet=atlas-e0cio3-shard-0&readPreference=primary&ssl=true"
    )
    mydb = myClient["sample_supplies"]

    collection = mydb["sales"]
    return collection
def InsertToGraphDB(): 
    e=datetime.datetime.utcnow()
    global path
    myClient = pymongo.MongoClient(
         "mongodb://localhost:27017"
    )
    mydb = myClient["graphViewerUsers"]
    coll = mydb['graph']
    test = coll.insert_one({"userID": USERID, "title": TITLE, "date": e, "type": TYPE})
    path = f'/{test.inserted_id}.png'
    print(test.inserted_id)
    return ObjectId(test.inserted_id), coll
    


def FetchData(userID, userColl):
    global path

    coll = ConnToDb()
    df = pd.DataFrame(list(coll.aggregate([{"$match": {"storeLocation": FILTER}} ,{"$group": {"_id": "$customer.gender" , "Number": {"$sum": 1}}} ])))
    colors = ["#0047AB", "#C70039"]
    number = df["Number"]
    gender = df["_id"]
    plt.pie(number, labels= gender, colors= colors, autopct='%1.1f%%')
    plt.suptitle(TITLE, fontsize=14)
    plt.title(FILTER, fontsize=10)
    #print(path)
    userColl.update_one({"_id": userID}, {"$set": {"graphLocation": path}})
    plt.savefig("../server/public"+path)

def main(): 
    ConnToDb()
    userID, userColl = InsertToGraphDB()
    FetchData(userID, userColl)



if __name__ == "__main__":
    main()