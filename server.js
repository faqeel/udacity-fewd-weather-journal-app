// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

/* Middleware*/

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.use(morgan('tiny'));

// Initialize the main project folder
app.use(express.static('public'));

// Spin up the server
const port = 3000;
const server = app.listen(port, () => {
  console.log(`running on localhost: ${port}`);
});

// Callback function to complete GET '/all'
app.get('/all', (req, res) => {
  res.send(projectData);
});

// Post Route
app.post('/add', (req, res) => {
  projectData = {
    date: req.body.date,
    temp: req.body.temp,
    feelings: req.body.feelings,
  };
  res.status(200).send('Data updated successfully');
});
