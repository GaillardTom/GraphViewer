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
    # df = pd.DataFrame(coll)
    doc = list(
        coll.aggregate([
        {"$match": {"storeLocation": FILTER}},
        {"$unwind": "$items"},
        {"$group": {"_id": "$items.name", "itemsQuantity": {"$sum":  "$items.quantity"}}}]
    ))
    return doc

def makePie(doc):
    ypoints = doc["itemsQuantity"] 
    label = doc["_id"]
    plt.bar(label, ypoints)
    plt.xticks(rotation=45)
    plt.title(f"Items Sold Per Region \n{FILTER}")
    plt.show()

def main(): 
    print(sys.argv[1])
    ConnToDb()
    coll = FetchData()
    salesDF = pd.DataFrame(coll)
    print(salesDF)
    makePie(salesDF)

if __name__ == "__main__":
    main()