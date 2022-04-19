import sys 
from pydoc import doc
import pymongo
import pandas as pd
import matplotlib.pyplot as plt
import numpy as np


FILTER = sys.argv[1]


def ConnToDb():
    myClient = pymongo.MongoClient(
        "mongodb://cfortier:cfortier123@cluster0-shard-00-00.gjdrt.mongodb.net:27017,cluster0-shard-00-01.gjdrt.mongodb.net:27017,cluster0-shard-00-02.gjdrt.mongodb.net:27017/test?authSource=admin&replicaSet=atlas-e0cio3-shard-0&readPreference=primary&ssl=true"
    )
    mydb = myClient["sample_supplies"]

    collection = mydb["sales"]
    return collection



def FetchData():
    coll = ConnToDb()
<<<<<<< HEAD
    # df = pd.DataFrame(coll)
    doc = list(
        coll.aggregate([
        {"$match": {"storeLocation": FILTER}},
        {"$unwind": "$items"},
        {"$group": {"_id": "$items.name", "itemsQuantity": {"$sum":  "$items.quantity"}}}]
    ))
    return doc
=======


    df = pd.DataFrame(list(coll.aggregate([{"$match": {"customer.gender": FILTER}} ,{"$group": {"_id": "$customer.satisfaction" , "Number": {"$sum": 1}}}, {"$sort": {"_id":1}} ])))
    xAxis = np.array(df["_id"])
    yAxis = np.array(df["Number"])

    plt.plot(xAxis,yAxis)
    plt.suptitle('Satisfaction per gender')
    if (FILTER == "M"): plt.title("Men")
    elif (FILTER == "F"): plt.title("Female")
    plt.xlabel('Satisfaction')
    plt.ylabel('yAxis name')
    plt.locator_params(axis='x', nbins=5)
    plt.grid(True)
    plt.show()
    
    return df
>>>>>>> 048d0e5069c7f54521ab46490d07053a3c0e9a02


def main(): 
    print(sys.argv[1])
    ConnToDb()
    genderDf = FetchData()
    print(genderDf)


if __name__ == "__main__":
    main()