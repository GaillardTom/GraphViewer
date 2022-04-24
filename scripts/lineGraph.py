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
TYPE = "line"
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
    path = f'../server/uploads/{test.inserted_id}.png'
    return ObjectId(test.inserted_id), coll
    

def FetchData(userID, userColl):
    coll = ConnToDb()
    global path


    df = pd.DataFrame(list(coll.aggregate([{"$match": {"customer.gender": FILTER}} ,{"$group": {"_id": "$customer.satisfaction" , "Number": {"$sum": 1}}}, {"$sort": {"_id":1}} ])))
    xAxis = np.array(df["_id"])
    yAxis = np.array(df["Number"])

    plt.plot(xAxis,yAxis)
    plt.suptitle(TITLE)
    if (FILTER == "M"): plt.title("Men")
    elif (FILTER == "F"): plt.title("Female")
    plt.xlabel('Satisfaction Rating 1-5')
    plt.ylabel('Number of Ratings')
    plt.locator_params(axis='x', nbins=5)
    plt.grid(True)
    updateDoc = userColl.update_one({"_id": userID}, {"$set": {"graphLocation": path}})
    plt.savefig(path)
    
    


def main(): 
    ConnToDb()
    userID, userColl = InsertToGraphDB()
    FetchData(userID, userColl=userColl)


if __name__ == "__main__":
    main()