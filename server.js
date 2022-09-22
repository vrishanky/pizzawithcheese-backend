// Import package(s)
var express = require('express');
var server = express();
var bodyParser = require('body-parser');
var mongoose= require('mongoose');

var userRoutes = require('./routes/user-routes.js');
var productRoutes = require('./routes/product-routes.js');

//Connect to MongoDB
var dbURL = process.env.DB_URL;

var dbConfig = {
    "useNewURLParser": true,
    "useUnifiedTopology": true
}

mongoose
.connect(dbURL, dbConfig)
.then(
    function() {
        console.log("Database is connected");
    }
)
.catch(
    function() {
        console.log('Database is connected', dbError);
    }
);

// Configure middlewares for express
var bodyParserConfig = {extened: false};
server.use( bodyParser.urlencoded(bodyParserConfig) );
server.use( bodyParser.json() );


// Create routes
server.get(
    '/',                                        // http://localhost:3001/
    function(req, res) {
        res.send("<h1>Welcome to the server!</h1>");
    }
);


server.use(
    '/users', userRoutes
);

server.use(
    '/products', productRoutes
);


// Listen to port number
server.listen(
    3001,
    function() {
        console.log('Server running at http://localhost:3001/');
    }
);