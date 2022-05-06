require('dotenv').config();
const express = require('express')
const cors = require('cors');
const { connectCallback, CreateUser, Connect, connectToUsersDB, GetAllLocations} = require('./database');
var jwt = require('jsonwebtoken');
const {CheckJWT} = require('./middlewares/auth');
var morgan = require('morgan');
const services = require('./services/services');
const bodyParser = require('body-parser');
const app = express();
const graphRoute = require('./graph_routes/graph_routes')
const path = require('path')



app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());
app.use('/static', express.static(path.join(__dirname, 'public')))



/**
 * @method post
 * @path '/register'
 * @param none
 * @headers none required
 * @body firstName, lastName, username, password
 * @responseStatus 200 for succesful account creation, 303 for username already taken or error with database, 500 for internal server error 
 * @responseBody Succesfully Created (on 200), Username Already taken (on 303), Error with DB (on 304), Internal Server Error (on 500)
 * 
 * 
 * This route is triggered on the client side when the user tries to create an account.
 * 
 * The response is used to validate the registration of a new user.
 * @
 */
app.post('/register', async(req, res)=>{ 
    if(req.body.firstName && req.body.lastName && req.body.username && req.body.password){ 
        
        const firstName = req.body.firstName;
        const lastName =req.body.lastName; 
        //FIND A WAY TO SANITIZE THIS DIORECTLY GOING TO DB 
        const username = req.body.username;
        const password = req.body.password; 
       
        try{ 
            if(await CreateUser(username, password, firstName, lastName)){ 
                res.status(200).send("Succesfully Created")

            }
            else{ 
                res.status(303).send('Username Already taken')
            }
        }
        catch{ 
            res.status(304).send('Error with DB')
        }
        
    }else{ 
        res.status(400).send('No informations');
    }
})



/**
 * @method post
 * @path '/login'
 * @param none
 * @headers none required
 * @body firstName, lastName, username, password
 * @responseStatus 200 for succesful account creation, 303 for username already taken or error with database, 500 for internal server error 
 * @responseBody Succesfully logged in + token provided for this user (on 200), No Informations (on 400), Unauthorized (on 404), Internal Server Error (on 500)
 * 
 * 
 * This route is triggered on the client side when the user tries to login.
 * 
 * The response is used to provided an user jwt to prove that he is logged in for the next routes.
 * @
 */
app.post('/login', async(req,res)=> { 
    
    if(req.body.username && req.body.password){
        try{ 
            const username = req.body.username
            const pw = req.body.password
            const user = await Connect(username, pw);

            if(user != false){ 
                //CREATE JWT AND ADD IT TO THE CLIENT SOMEHOW SO THAT LOG MIDDLEWARE CAN CHEKC FOR IT 
                
                const payload = { 
                    username: username,
                    graph: user.graph,
                    _id:   user._id                 
                }
                const userJWT =  jwt.sign(payload, process.env.SECRET, { expiresIn: '1h' })
                
                res.json({message: "Succefully logged in",
                        token: userJWT}).status(200)
            }
            else{ 
                res.status(404).send('Unauthorized')
            }
        } 
        catch (e) { 
            console.log(e)
            res.status(404).send('Unauthorized')
        }
        
    }
    else{ 
        res.status(400).send('No Informations')
    }
})

//AUTH MIDDLEWARE
app.use(CheckJWT)
//GRAPH ROUTE 
app.use('/graph', graphRoute)
app.get('/locations', async(req,res)=> {
    
    const ans = await GetAllLocations()
    if(ans){ 
        res.status(200).send(ans)

    }else{ 
        res.status(400).send("Error")

    }
})

const PORT = 8080;
connectCallback(() => {
    connectToUsersDB()
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`)
    })
})