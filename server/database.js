const { MongoClient, MONGO_CLIENT_EVENTS } = require('mongodb');
const { HashPassword, ComparePassword} = require('./services/services');

// Connection URL
const salesURL = process.env.DB_CONNECTION_STRING;
const salesClient = new MongoClient(salesURL);
const usersURL = process.env.DB_USERS_CONNSTRING;
const userClient = new MongoClient(usersURL);
// Database
let salesDatabase = salesClient.db(process.env.DB_NAME);
let usersDatabase = userClient.db(process.env.DB_NAME2);
async function connectToSalesDB(dbName) {
    // Use connect method to connect to the server
    try {
        await salesDatabase.connect();
        salesDatabase = await salesDatabase.database(dbName);
        console.log('Connected successfully to local sales db');
    } catch (err) {
        console.error('Could not connect to local sales db')
        console.error(err);
    }

    return 'done.';
}

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

function connectCallback(callback) {
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


async function ConnectGraphDB(userID, graphID){ 

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
      }
    
}


module.exports = {
    connect: connectToSalesDB,
    connectCallback,
    database: salesDatabase,
    CreateUser,
    Connect,
    connectToUsersDB,

    
}