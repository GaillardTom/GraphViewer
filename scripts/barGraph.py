import sys 
from pydoc import doc
from pkg_resources import CHECKOUT_DIST
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


def makeBarGraph(doc): 
    plt.title('Age By Location')
    conditions = []
    changes = {}
    np.select()
    

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
    
    print(df)
    ageRange = { (1,18): 0, (18, 30): 0, (30, 60): 0, (60, 1000): 0}
    print('test', ageRange[(1, 18)])
    
    #ages = []
    #for i in df: 
     #   ages.append(i)
   #TODO AGE RANGE WITH THE AGE OF THE DATAFRAME !! 
    
    choices = [[18], [30], [60], [1000] ] 
    conditions = [ ( df["_id"] < 18),
                    ( df["_id"] < 30), 
                     (df["_id"] < 60),
                     (df["_id"] < 1000) ]
    ageRange = np.select(choices, conditions)
    print(ageRange)
    return ageRange


    
    


    
def main(): 
    print(sys.argv[1])
    ConnToDb()
    coll = FetchData()
    salesDF = pd.DataFrame(coll)
    
    ReturnGoodAge(salesDF)

if __name__ == "__main__":
    main()