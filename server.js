// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
// note that bodyParser is now included in express: https://stackoverflow.com/questions/24330014/bodyparser-is-deprecated-express-4
// The app would not work using bodyParser as specified in the starter code
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 8000;
const server = app.listen(port, ()=>{console.log(`running on localhost: ${port}`)});

// callback functions for GET and POST routes
const addEntry = (req, res) => {
    projectData = req.body;
    res.status(200).send(projectData);
    console.log(projectData);
}; 

const retrieveEntry = (req, res) => {
    res.status(200).send(JSON.stringify(projectData));
};

// POST route (allows app.js to submit new entry to projectData)
app.post('/add-entry', addEntry);

// GET route (allows app.js to access projectData)
app.get('/retrieve-entry', retrieveEntry);



