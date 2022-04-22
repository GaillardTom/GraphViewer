const express = require('express');
const graph = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' })
const services = require('../services/services')
const {connectToSalesDB,
        connectCallback,
        database: salesDatabase,
        CreateUser,
        Connect,
        connectToUsersDB,AddGraphToUsers, FindUserByID} = require('../database')
graph.get('/graph', async function (req, res) {

        res.status(200).send('Successful');

})

graph.get('/graph/:id', async function (req, res) {

        res.status(401).send('User not found');

})

graph.post('/graph', upload.single('graph'), async function (req, res) {

        let today = new Date().toISOString().slice(0, 10)
        AddGraphToUsers(req.body.username, req.file.graph)
        user.graph[req.body.id] = req.file.path;

        res.send(user.graph);

})

graph.delete('/graph/:id', async function (req, res) {
        const username =services.sanitizeString(req.body.username) 

        const user = await database.collection('users').findOne({ username: username });
        delete user.graph[req.params.id];
        await database.collection('users').removeOne({ graph: user.graph.id });
        res.send("Graph deleted").status(200);
})


module.exports = graph