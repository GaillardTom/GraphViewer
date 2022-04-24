require('dotenv').config();
const express = require('express')
const cors = require('cors');
const { connectCallback, CreateUser, Connect, connectToUsersDB } = require('./database');
var jwt = require('jsonwebtoken');
const {CheckJWT} = require('./middlewares/auth');
var morgan = require('morgan');
const services = require('./services/services');
const bodyParser = require('body-parser');
const app = express();
const graphRoute = require('./graph_routes/graph_routes')



app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());


app.get('/', function(req, res) {
    res.send('Graph Viewer');
})

app.post('/register', async(req, res)=>{ 
    if(req.body.firstName && req.body.lastName && req.body.username && req.body.password){ 
        
        const firstName = req.body.firstName;
        const lastName =req.body.lastName; 
        //FIND A WAY TO SANITIZE THIS DIORECTLY GOING    TO DB 
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
            res.status(303).send('Error with DB')
        }
        
    }else{ 
        res.status(400).send('No informations');
    }
})


app.post('/login', async(req,res)=> { 
    //print(req.body.password)
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
                
                res.json({message: "succefully created",
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


const PORT = 8080;
connectCallback(() => {
    connectToUsersDB()
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`)
    })
})