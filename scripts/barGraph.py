import sys 
from pydoc import doc
from pkg_resources import CHECKOUT_DIST
import pymongo
import pandas as pd
import matplotlib.pyplot as plt
import numpy as np


FILTER = sys.argv[1]
TITLE = sys.argv[2]

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
    ageRange = { "1-18": 0, "18-30": 0, "30-60": 0, "60+": 0}
    
    for age, count in df.iterrows(): 
        print("AGE", age, "COUNT", count)
        if(count['_id'] < 18 and count['_id'] >= 1 ):
            ageRange["1-18"] += count['count']
        elif(count['_id']< 30 and count['_id'] >= 18):
            ageRange["18-30"] += count['count']
        elif(count['_id'] < 60 and count['_id'] >= 30):
            ageRange["30-60"] += count['count']
        elif(count['_id'] >= 60):
            ageRange["60+"] += count['count']
    return ageRange

def MakeBarGraph(ageRange) :
    print(ageRange)
    plt.suptitle(TITLE)
    plt.title(FILTER)
    ages = list(ageRange.keys())
    values = list(ageRange.values())
    plt.barh(ages, values)
    plt.ylabel("Age Range")
    plt.xlabel("Values")

    #plt.show()
    plt.savefig(r'D:\Winter2022\GraphViewer\server\uploads')
    #ages = []
    #for i in df: 
     #   ages.append(i)
   #TODO AGE RANGE WITH THE AGE OF THE DATAFRAME !! 
   
    """
     choices = [[18], [30], [60], [1000] ] 
    conditions = [ ( df["_id"] < 18),
                    ( df["_id"] < 30), 
                     (df["_id"] < 60),
                     (df["_id"] < 1000) ]
    ageRange = np.select(choices, conditions)
    print(ageRange)
    return ageRange
    
    """


    
    


    
def main(): 
    print(sys.argv[1])
    ConnToDb()
    coll = FetchData()
    salesDF = pd.DataFrame(coll)
    
    ageRange = ReturnGoodAge(salesDF)
    MakeBarGraph(ageRange)
if __name__ == "__main__":
    main()