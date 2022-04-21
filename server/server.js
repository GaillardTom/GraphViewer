require('dotenv').config();
const express = require('express')
const multer = require('multer');
const cors = require('cors');
const { connectCallback, CreateUser, Connect, connectToUsersDB } = require('./database');
const upload = multer({ dest: 'uploads/' })
var jwt = require('jsonwebtoken');
const auth = require('./middlewares/auth');
var morgan = require('morgan');
const services = require('./services/services');
const bodyParser = require('body-parser');
const app = express();
app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());





app.get('/', function(req, res) {
    res.send('Graph Viewer');
})

//app.use(auth)
app.post('/register', async(req, res)=>{ 
    if(req.body.firstName && req.body.lastName && req.body.username && req.body.password){ 
        
        const firstName = req.body.firstName;
        const lastName =req.body.lastName; 
        //FIND A WAY TO SANITIZE THIS DIORECTLY GOING    TO DB 
        const username = req.body.username;
        const password = req.body.password; 
       
        try{ 
            //await connectToUsersDB();
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
    if(req.body.username && req.body.password){
        try{ 
            const username = req.body.username
            const pw = req.body.password
            const user = await Connect(username, pw);
            console.log('user: ', user);

            if(user != false){ 
                console.log('Connect: ', await Connect(username, pw));
                //CREATE JWT AND ADD IT TO THE CLIENT SOMEHOW SO THAT LOG MIDDLEWARE CAN CHEKC FOR IT 
                
                const payload = { 
                    username: username,                    
                }
                const userJWT =  jwt.sign(payload, process.env.SECRET)
                console.log('userJWT: ', userJWT);
                
                res.send('Succesfully logged in').status(200)
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
        res.send('No Informations').status(400)
    }
})
app.get('/graph', async function(req, res) {
        res.status(401).send('User not found');
    
})

app.get('/graph/:id', async function(req, res) {
   
        res.status(401).send('User not found');
    
})

app.post('/graph', upload.single('graph'), async function(req, res) {
    const user = await database.collection('users').findOne({ username: req.query.username });
    if (!user) {
        res.status(401).send('User not found');
    } else {
        user.graph[req.body.id] = req.file.path;
        await database.collection('users').updateOne({ username: req.query.username }, { $set: { graph: user.graph } });
        res.send(user.graph);
    }
})

app.delete('/graph/:id', async function(req, res) {
})

const PORT = 8080;
connectCallback(() => {
    connectToUsersDB()
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`)
    })
})