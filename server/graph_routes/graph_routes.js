const express = require('express');
const { ObjectId } = require('mongodb');
const graph = express.Router();
const services = require('../services/services')
const { GetUserIDWithJWT } = require('../middlewares/auth')
const { GetGraphLocation, GetAllGraph, DeleteGraphOfUser,GetGraphsByType } = require('../database')
const { spawn } = require('child_process');

//const defaults = { cwd: "..\\scripts" }

//check for more error handling title


/**
 * @method get
 * @path '/graph/'
 * @param none
 * @headers token (user's jwt)
 * @body none
 * @responseStatus 200 for success, 400 for no token provided, 500 for internal server error 
 * @responseBody returns all graphs of user
 * 
 * 
 * This route is triggered on the client side when the user comes to the graph page.
 * 
 * The response is used to populate the graph page with all the graphs of the user.
 * @
 */
graph.get('/', async function (req, res) {

        if (req.header("token")) {
                const token = req.header("token");
                const userID = await GetUserIDWithJWT(token)

                if(!req.body.type){ 
                //console.log('userID: ', userID);
                const graphs = await GetAllGraph(userID)
                if (graphs) {
                        res.status(200).json({ graphs: graphs });

                }
                }
                else{ 
                        const type = req.body.type
                        const graph = await GetGraphsByType(userID, type)
                        if(graph){ 
                                res.status(200).json({graphs: graph})
                        }
                }
                
        }
        else {
                res.status(400).send("NO TOKEN ")
        }


})



/**
 * @method get
 * @path '/graph/:id'
 * @param id
 * @headers token (user's jwt)
 * @body none
 * @responseStatus 200 for success, 400 for no token provided, 500 for internal server error 
 * @responseBody returns graph of the provided id
 * 
 * 
 * This route is triggered on the client side when the user tries to get the requested graph.(for example: after creating one it will call this path and get the _id and the path to display it on the frontend)
 * 
 * The response is used to return the graph that was requested with its graphID, location and its title.
 * @
 */
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



/**
 * @method post
 * @path 'graph/barGraph/'
 * @param none
 * @headers token (user's jwt)
 * @body title (title for the graph), filter (the filter is the store location the user is trying to create a graph about) 
 * @responseStatus 200 for success,  500 for internal server error and no token provided
 * @responseBody CREATED
 * 
 * 
 * This route is triggered on the client side when the user comes to the graph page.
 * 
 * The response is used to validate that the graph was created.
 * @
 */
graph.post('/barGraph', async(req, res) => {
        var dataToSend;
        const filter = req.body.filter
        console.log('filter: ', filter);
        const user = await GetUserIDWithJWT(req.header('token'))
        console.log('user: ', user);
        const title = req.body.title
        console.log('title: ', title);
        // spawn new child process to call the python script
        const python = await spawn('python', ['..\\scripts\\barGraph.py', filter, title, user]);
        //res.status(200).send('CREATED')
        //TODO MAKE THNE SCRIPT RETURN MAYBE THE OBJECT ID OF THE GRAPH SO THAT WE CAN DISPLAY IT ON THE FRONTEND JUST AFTER
        // collect data from script
        python.stdout.on('data', function (data) {
                console.log('data: ', data.toString());
                const graphID=data.toString().replace('\r', "").replace('\n', "");
                res.status(200).json({data: graphID})

                console.log('Test: ', data);
         console.log('Pipe data from python script ...');
        })
        //dataToSend = data.toString();
});



/**
 * @method post
 * @path 'graph/columnGraph/'
 * @param none
 * @headers token (user's jwt)
 * @body title (title for the graph), filter (the filter is the store location the user is trying to create a graph about) 
 * @responseStatus 200 for success, 400 for no token provied, 500 for internal server error 
 * @responseBody CREATED
 * 
 * 
 * This route is triggered on the client side when the user tries to upload a column graph.
 * 
 * The response is used to validate that the graph was created.
 * @
 */
graph.post('/columnGraph', async(req, res) => {
        var dataToSend;
        const filter = req.body.filter
        console.log('filter: ', filter);
        const user = await GetUserIDWithJWT(req.header('token'))
        console.log('user: ', user);
        const title = req.body.title
        console.log('title: ', title);
        // spawn new child process to call the python script
        const python = await spawn('python', ['..\\scripts\\columnGraph.py', filter, title, user]);
        //res.status(200).send('CREATED')
        //TODO MAKE THNE SCRIPT RETURN MAYBE THE OBJECT ID OF THE GRAPH SO THAT WE CAN DISPLAY IT ON THE FRONTEND JUST AFTER
        // collect data from script
        python.stdout.on('data', function (data) {
                console.log('data: ', data.toString());
                const graphID=data.toString().replace('\r', "").replace('\n', "");
                res.status(200).json({data: graphID})

                console.log('Test: ', data);
         console.log('Pipe data from python script ...');
        })
        //dataToSend = data.toString();
});


/**
 * @method post
 * @path 'graph/lineGraph/'
 * @param none
 * @headers token (user's jwt)
 * @body title (title for the graph), filter (the filter is the store location the user is trying to create a graph about) 
 * @responseStatus 200 for success, 400 for no token provied, 500 for internal server error 
 * @responseBody CREATED
 * 
 * 
 * This route is triggered on the client side when the user tries to upload a line graph.
 * 
 * The response is used to validate that the graph was created.
 * @
 */
graph.post('/lineGraph', async(req, res) => {
        var dataToSend;
        const filter = req.body.filter
        console.log('filter: ', filter);
        const user = await GetUserIDWithJWT(req.header('token'))
        console.log('user: ', user);
        const title = req.body.title
        console.log('title: ', title);
        // spawn new child process to call the python script
        const python = await spawn('python', ['..\\scripts\\lineGraph.py', filter, title, user]);
        //TODO MAKE THE SCRIPT RETURN MAYBE THE OBJECT ID OF THE GRAPH SO THAT WE CAN DISPLAY IT ON THE FRONTEND JUST AFTER
        // collect data from script
        //var graphID = ''
        python.stdout.on('data', function (data) {
                console.log('data: ', data.toString());
                const graphID=data.toString().replace('\r', "").replace('\n', "");
                res.status(200).json({data: graphID})

                console.log('Test: ', data);
         console.log('Pipe data from python script ...');
        })

        //dataToSend = data.toString();
});



/**
 * @method post
 * @path 'graph/pieGraph/'
 * @param none
 * @headers token (user's jwt)
 * @body title (title for the graph), filter (the filter is the store location the user is trying to create a graph about) 
 * @responseStatus 200 for success, 400 for no token provied, 500 for internal server error 
 * @responseBody CREATED
 * 
 * 
 * This route is triggered on the client side when the user tries to upload a pie graph.
 * 
 * The response is used to validate that the graph was created.
 * @
 */
graph.post('/pieGraph', async(req, res) => {
        var dataToSend;
        const filter = req.body.filter
        console.log('filter: ', filter);
        const user = await GetUserIDWithJWT(req.header('token'))
        console.log('user: ', user);
        const title = req.body.title
        console.log('title: ', title);
        // spawn new child process to call the python script
        const python = await spawn('python', ['..\\scripts\\pieGraph.py', filter, title, user]);
        //res.status(200).send('CREATED')
        //TODO MAKE THNE SCRIPT RETURN MAYBE THE OBJECT ID OF THE GRAPH SO THAT WE CAN DISPLAY IT ON THE FRONTEND JUST AFTER
        // collect data from script
        python.stdout.on('data', function (data) {
                console.log('data: ', data.toString());
                const graphID=data.toString().replace('\r', "").replace('\n', "");
                res.status(200).json({data: graphID})

                console.log('Test: ', data);
         console.log('Pipe data from python script ...');
        })
        //dataToSend = data.toString();
});




/**
 * @method delete
 * @path '/graph/:id'
 * @param id of the graph that is to be deleted
 * @headers token (user's jwt)
 * @body none
 * @responseStatus 200 for success, 400 for no token provied, 404 for no graph found, 500 for internal server error 
 * @responseBody Graph Deleted (on 200),Please log in first (on 400), Graph not found (on 404), Internal Server Error (on 500)
 * 
 * 
 * This route is triggered on the client side when the user tries to remove one of his graphs.
 * 
 * The response is used to validate that the graph was deleted.
 * @
 */
graph.delete('/:id', async function (req, res) {
        console.log(req.params.id);
        const ids = ObjectId(req.params.id);
        const userID = await GetUserIDWithJWT(req.header('token'))
        if (ids) {

                // CREATE A FUNCTION THAT TAKES THIS AND PUT IT IN DB NO DATABASE ON ROUTES GADDEM FAIS 30 FOIS JE LE DIT CALISS
                const result = await DeleteGraphOfUser(ids, ObjectId(userID))
                if(result){ 
                        res.send('Graph deleted').status(200);

                }else {
                        res.send('Graph not found').status(404);
                }              
        }
        else {
                res.send('Graph not found').status(404);
        }
})




module.exports = graph