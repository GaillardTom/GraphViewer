require('dotenv').config();
const express = require('express')
const multer = require('multer');
const cors = require('cors');
const { connectCallback, CreateUser } = require('./database');
const upload = multer({ dest: 'uploads/' })
var jwt = require('jsonwebtoken');
const auth = require('./middlewares/auth');

const services = require('./services/services');

const app = express()

app.use(cors());

app.get('/', function(req, res) {
    res.send('Graph Viewer');
})

//app.use(auth)
app.post('/register', async(req, res)=>{ 
    if(req.body.firstName && req.body.lastName && req.body.username && req.body.password){ 
        
        const firstName = services.sanitizeString(req.body.firstName);
        const lastName =services.sanitizeString(req.body.lastName); 
        const username = req.body.username;
        const password = req.body.password; 
       
        
        
        CreateUser(username, password, firstName, lastName);
    }else{ 
        res.send('No informations').status(400);
    }
})
app.get('/graph', async function(req, res) {
        res.status(401).send('User not found');
    } 
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
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`)
    })
})