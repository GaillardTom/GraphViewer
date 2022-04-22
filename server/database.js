const { MongoClient, ObjectId, ObjectID } = require('mongodb');
const { HashPassword, ComparePassword} = require('./services/services');

// Connection URL
const salesURL = process.env.DB_CONNECTION_STRING;
const salesClient = new MongoClient(salesURL);
const usersURL = process.env.DB_USERS_CONNSTRING;
const userClient = new MongoClient(usersURL);
// Database
let salesDatabase = salesClient.db(process.env.DB_NAME);
let usersDatabase = userClient.db(process.env.DB_NAME2);

async function connectToUsersDB(){ 
    try {
        await userClient.connect();
        //usersDatabase = await usersDatabase.database(dbName);
        console.log('Connected successfully to local users db');
    } catch (err) {
        console.error('Could not connect to local users db')
        console.error(err);
    }

    return 'done.';
}

function connectToSalesCallback(callback) {
    // Use connect method to connect to the server
    salesClient.connect((error, res) => {
        if (error) {
            console.error('Could not connect to local db')
            console.error(err);
        } else {
            console.log('Connected successfully to local server');
            callback();
        }
    });
}

async function CreateUser(username, password, firstName, lastName) {
    try{
        //connectToUsersDB()
        if(await usersDatabase.collection('users').findOne({username})){
            return false
        }else{ 
            const hash = await HashPassword(password);
            const user = {
              username: username,
              password: hash,
              firstName: firstName,
              lastName: lastName,
              graph: [],
            };
            await usersDatabase.collection('users').insertOne(user);
            return true;
        }
        
    }
    catch (err){ 
        console.log(err);
        return false;
    }
   
}

async function FindUser(username){ 
    try{
        const user = await usersDatabase.collection('users').findOne({username});
        if(user == null)
        {
            return false;
        }
        else{ 
            return user;
        }
    }
    catch (err){ 
        console.log(err);
        return false;
    }
}

async function Connect(username,password)
{
      const user = await usersDatabase.collection('users').findOne({username});
      if(user == null)
      {
        console.log('userNNULL: ', user);

          return false;
      }
      else{ 
        const result = await ComparePassword(password, user.password);
        console.log('result: ', result);
        if(result)
        {
            return user;
        }
        else { 
            return false
        }
      }
    
}
async function FindUserByID(id){ 
    try{ 
        id = ObjectId(id)
        user = await usersDatabase.findOne({_id: id})
        if (user != null){ 
            return user
        }else {
            return false
        }
        
    }
    catch(e){ 
        console.error('e: ', e);
        return false
    }
    
}
async function AddGraphToUsers(username, graph){ 

    try{ 
        await usersDatabase.collection('graph').updateOne({ username: username }, { $push: { graph: graph } });
        return true

    }
    catch(e){ 
        console.log(e);
        return false
    }

    
}

async function GetGraphLocation(graphID){ 

    graphID = ObjectId(graphID)
    try{ 
        const userGraph = await usersDatabase.collection('graph').findOne({_id: graphID})
        if(userGraph != null){ 
            console.log('userGraph: ', userGraph);
            return userGraph.graphLocation
        }
        else{ 
            return false
        }
        
    }
    catch (e ){ 
        console.error(e);
        return false
    }
}
async function GetAllGraph(userID){ 
    try { 
        
        const test = await ObjectId(userID)
        const userGraphs = await usersDatabase.collection('graph').find({userID: test}).toArray()
        console.log('userGraphs: ', userGraphs);
        return userGraphs
    }catch(e){ 
        console.error(e);
        return false
    }
}
module.exports = {
    connectCallback: connectToSalesCallback,
    database: salesDatabase,
    usersDatabase: usersDatabase,
    CreateUser,
    Connect,
    connectToUsersDB,
    AddGraphToUsers,
    FindUserByID,
    GetGraphLocation,
    FindUser,
    GetAllGraph
}