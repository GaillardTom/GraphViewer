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
TYPE = "Satisfaction per gender in " + FILTER
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
    userCollection = mydb['graph']
    test = userCollection.insert_one({"userID": USERID, "title": TITLE, "date": e, "type": TYPE})
    print(test.inserted_id)
    path = f'/{test.inserted_id}.png'
    return ObjectId(test.inserted_id), userCollection
    

def FetchData(userID, userColl):
    coll = ConnToDb()
    global path


    dfFemale = pd.DataFrame(list(coll.aggregate([{"$match": {"storeLocation": FILTER, "customer.gender": "F"}} ,
                                             {"$unwind": "$customer"},
                                             {"$group": { "_id": "$customer.satisfaction" ,  "Number": {"$sum": "$customer.satisfaction"}}
                                              }, {"$sort": {"_id":1}} ])))
    dfMale = pd.DataFrame(list(coll.aggregate([{"$match": {"storeLocation": FILTER, "customer.gender": "M"}} ,
                                             {"$unwind": "$customer"},
                                             {"$group": { "_id": "$customer.satisfaction" ,  "Number": {"$sum": "$customer.satisfaction"}}
                                              }, {"$sort": {"_id":1}} ])))

    xAxisMale = np.array(dfMale["_id"])
    yAxisMale = np.array(dfMale["Number"])
    xAxisFemale = np.array(dfFemale["_id"])
    yAxisFemale = np.array(dfFemale["Number"])
    plt.plot(xAxisMale,yAxisMale, color = 'blue', label = "Male")
    plt.plot(xAxisFemale,yAxisFemale, color = 'pink', label = "Female")
    plt.suptitle(TITLE)
    plt.title(f"Statisfaction per Gender in {FILTER}")
    plt.legend(title= "Genders")
    plt.xlabel('Satisfaction Rating 1-5')
    plt.ylabel('Number of Ratings')
    plt.locator_params(axis='x', nbins=5)
    plt.grid(True)

    updateDoc = userColl.update_one({"_id": userID}, {"$set": {"graphLocation": path}})
    plt.savefig("../server/public"+path)
    
    


def main(): 
    ConnToDb()
    userID, userColl = InsertToGraphDB()
    FetchData(userID, userColl=userColl)


if __name__ == "__main__":
    main()