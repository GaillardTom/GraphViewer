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


const PORT = 8080;
connectCallback(() => {
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`)
    })
})