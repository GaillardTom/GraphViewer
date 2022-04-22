import sys 
from pydoc import doc
import pymongo
import pandas as pd
import matplotlib.pyplot as plt
import numpy as np


FILTER = sys.argv[1]
TITLE = sys.argv[2]

def ConnToDb():
    myClient = pymongo.MongoClient(
        "mongodb://localhost:27017"
    )
    mydb = myClient["sample_supplies"]

    collection = mydb["sales"]
    return collection



def FetchData():
    coll = ConnToDb()
    df = pd.DataFrame(list(coll.aggregate([{"$match": {"storeLocation": FILTER}} ,{"$group": {"_id": "$customer.gender" , "Number": {"$sum": 1}}} ])))
    print(df);
    colors = ["#0047AB", "#C70039"]
    number = df["Number"]
    gender = df["_id"]
    plt.pie(number, labels= gender, colors= colors, autopct='%1.1f%%')
    plt.suptitle(TITLE, fontsize=14)
    plt.title(FILTER, fontsize=10)
    plt.show()
    return plt


def main(): 
    print(sys.argv[1])
    print(sys.argv[2])
    ConnToDb()
    plt = FetchData()

    plt.show()

if __name__ == "__main__":
    main()