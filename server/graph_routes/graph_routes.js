const express = require('express');
const graph = express.Router();

graph.get('/graph', async function(req, res) {
   
        res.status(401).send('User not found');
   
})

graph.get('/graph/:id', async function(req, res) {
   
        res.status(401).send('User not found');
    
})

graph.post('/graph', upload.single('graph'), async function(req, res) {
    
    let today = new Date().toISOString().slice(0, 10)
    
        user.graph[req.body.id] = req.file.path;

        await database.collection('graph').updateOne({ username: req.query.username }, { $push: { graph: user.graph } });
        res.send(user.graph);
    
})

graph.delete('/graph/:id', async function(req, res) {
    const user = await database.collection('users').findOne({ username: req.query.username });
    delete user.graph[req.params.id];
    await database.collection('users').removeOne({graph: user.graph.id});
    res.send("Graph deleted").status(200);
})


module.exports = graph