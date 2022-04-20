require('dotenv').config();
const express = require('express')
const multer = require('multer');
const cors = require('cors');
const { connectCallback } = require('./database');
const upload = multer({ dest: 'uploads/' })
var jwt = require('jsonwebtoken');


const app = express()

app.use(cors());

app.get('/', function(req, res) {
    res.send('Health check')
})

app.get('/graph', async function(req, res) {
    const user = await database.collection('users').findOne({ username: req.query.username });
    if (!user) {
        res.status(401).send('User not found');
    } else {
        res.send(user.graph);
    }
})

app.get('/graph/:id', async function(req, res) {
    const user = await database.collection('users').findOne({ username: req.query.username });
    if (!user) {
        res.status(401).send('User not found');
    } else {
        res.send(user.graph[req.params.id]);
    }
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