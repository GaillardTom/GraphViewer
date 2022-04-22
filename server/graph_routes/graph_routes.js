const express = require('express');
const { ObjectId } = require('mongodb');
const graph = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' })
const services = require('../services/services')
const {GetUserIDWithJWT} = require('../middlewares/auth')
const {connectToSalesDB,
        connectCallback,
        database: salesDatabase,
        AddGraphToUsers, FindUserByID,GetGraphLocation,GetAllGraph } = require('../database')
graph.get('/', async function (req, res) {

        if(req.header("token")){ 
                const token = req.header("token");
                const userID = await GetUserIDWithJWT(token)
                console.log('userID: ', userID);
                const graphs = await GetAllGraph(userID)
                if(graphs){ 
                        res.status(200).json({graphs: graphs});

                }
        }
        else { 
                res.status(400).send("NO TOKEN ")
        }
        

})

graph.get('/:id', async function (req, res) {

        if(req.params.id){ 
                const location = await GetGraphLocation(req.params.id)
                console.log('location: ', location);
                if(location.length >= 0){ 
                        res.status(200).json({graphID: req.params.graphID, location: location})

                }
                else{ 
                        res.status(404).send('No Graph Found')
                }

        }
        else( 
                res.status(404).send('No Graph ID Specified')
        )
})

graph.post('/', upload.single('graph'), async function (req, res) {
        /* 
        
        let today = new Date().toISOString().slice(0, 10)
        AddGraphToUsers(req.body.username, req.file.graph)
        user.graph[req.body.id] = req.file.path;

        res.send(user.graph);

        
        */
        
})
graph.delete('/:id', async function(req, res) {
        const ids = ObjectId(id);
        if (ids) {
            await database.collection('graph').deleteOne({_id: ids});
            res.send('Graph deleted').status(200);
        }
        else {
                res.send('Graph not found').status(404);
        }
})

graph.get('/show/:id', async(req, res)=> { 
        if(ObjectId(req.params.id)){ 
                const id = ObjectId(req.params.id)

        }
})


module.exports = graph