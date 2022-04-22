const express = require('express');
const { ObjectId } = require('mongodb');
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
        /* 
        
        let today = new Date().toISOString().slice(0, 10)
        AddGraphToUsers(req.body.username, req.file.graph)
        user.graph[req.body.id] = req.file.path;

        res.send(user.graph);

        
        */
        
})

graph.delete('/graph/:id', async function(req, res) {
        const ids = ObjectId(id);
        if (ids) {
            await database.collection('graph').deleteOne({_id: ids});
            res.send('Graph deleted').status(200);
        }
        else {
                res.send('Graph not found').status(404);
        }
})


module.exports = graph