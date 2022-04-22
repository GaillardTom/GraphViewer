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
    df = pd.DataFrame(list(coll.aggregate([{"$match": {"storeLocation": FILTER}} ,{"$group": {"_id": "$customer.gender" , "Number": {"$sum": 1}}} ])))
    colors = ["#0047AB", "#C70039"]
    number = df["Number"]
    gender = df["_id"]
    plt.pie(number, labels= gender, colors= colors, autopct='%1.1f%%')
    plt.suptitle("Gender per region", fontsize=14)
    plt.title(FILTER, fontsize=10)
    plt.show()
    return plt


def main(): 
    print(sys.argv[1])
    ConnToDb()
    plt = FetchData()

    plt.show()

if __name__ == "__main__":
    main()