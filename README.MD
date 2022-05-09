Sacha and Tom project built on python, node, express and React connected to a Mongo database to view graph in a browser with parameters: 


Installation:

    -Have a mongoDB instance on your machine and add the data within a collection named sample_supplies in it 
    -Make the .env file in consequence
    
    
Contents of .env: 

    -DB_CONNECTION_STRING=mongodb://localhost:27017
    -DB_USERS_CONNSTRING=mongodb://localhost:27017
    -DB_NAME=sample_supplies
    -DB_NAME2=graphViewerUsers
    -SECRET=[YOURSECRETMESSAGE]
    
Instructions (back-end):

    -cd server
    -npm i
    -nodemon server.js
    
Instructions(front-end):

    -cd client
    -npm i 
    -npm start 
