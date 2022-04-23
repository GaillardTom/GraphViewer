const express = require('express');
const { ObjectId } = require('mongodb');
const graph = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' })
const services = require('../services/services')
const { GetUserIDWithJWT } = require('../middlewares/auth')
const { GetGraphLocation, GetAllGraph } = require('../database')
const { spawn } = require('child_process');

const defaults = { cwd: "D:\\Winter2022\\GraphViewer\\scripts" }
graph.get('/', async function (req, res) {

        if (req.header("token")) {
                const token = req.header("token");
                const userID = await GetUserIDWithJWT(token)
                console.log('userID: ', userID);
                const graphs = await GetAllGraph(userID)
                if (graphs) {
                        res.status(200).json({ graphs: graphs });

                }
        }
        else {
                res.status(400).send("NO TOKEN ")
        }


})

graph.get('/:id', async function (req, res) {

        if (req.params.id) {
                const userGraph = await GetGraphLocation(req.params.id)
                const location = userGraph.graphLocation
                const userID = await GetUserIDWithJWT(req.header('token'))
                console.log('userID: ', userID);
                console.log('userGraph.userID: ', userGraph.userID);
                if (userID == userGraph.userID) {

                        if (location.length >= 0) {
                                res.status(200).json({ graphID: req.params.id, location: location, title: userGraph.title })

                        }
                        else {
                                res.status(404).send('No Graph Found')
                        }
                }
                else {
                        res.status(404).send('No rights to access this graph')
                }
        }
        else (
                res.status(404).send('No Graph ID Specified')
        )
})
graph.post('/barGraph', async(req, res) => {
        var dataToSend;
        const filter = req.body.filter
        console.log('filter: ', filter);
        const user = await GetUserIDWithJWT(req.header('token'))
        console.log('user: ', user);
        const title = req.body.title
        console.log('title: ', title);
        // spawn new child process to call the python script
        const python = await spawn('python', ['D:\\Winter2022\\GraphViewer\\scripts\\barGraph.py', filter, title, user]);
        res.status(200).send('CREATED')
        //TODO MAKE THNE SCRIPT RETURN MAYBE THE OBJECT ID OF THE GRAPH SO THAT WE CAN DISPLAY IT ON THE FRONTEND JUST AFTER
        // collect data from script
        python.stdout.on('data', function (data) {
                console.log('data: ', data.toString());
         console.log('Pipe data from python script ...');
        })
        //dataToSend = data.toString();
});
graph.post('/', upload.single('graph'), async function (req, res) {
        /* 
        
        let today = new Date().toISOString().slice(0, 10)
        AddGraphToUsers(req.body.username, req.file.graph)
        user.graph[req.body.id] = req.file.path;

        res.send(user.graph);

        
        */

})
graph.delete('/:id', async function (req, res) {
        const ids = ObjectId(req.params.id);
        const userID = await GetUserIDWithJWT(req.header('token'))
        if (ids) {

                // CREATE A FUNCTION THAT TAKES THIS AND PUT IT IN DB NO DATABASE ON ROUTES GADDEM FAIS 30 FOIS JE LE DIT CALISS
                await database.collection('graph').deleteOne({ _id: ids, userID: ObjectId(userID) });
                res.send('Graph deleted').status(200);
        }
        else {
                res.send('Graph not found').status(404);
        }
})

graph.get('/show/:id', async (req, res) => {
        if (ObjectId(req.params.id)) {
                const id = ObjectId(req.params.id)

        }
})


module.exports = graph