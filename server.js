//SERVER

//DEPENDENCIES
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

// EXPRESS CONFIGURATION
var app = express();
var PORT = process.env.PORT || 8080; 

// BodyParser makes it easy for our server to interpret data.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

//Making files in public folder available to be requested.
app.use(express.static(path.join(__dirname, 'app/public')));

// ROUTER
require('./app/routing/apiRoutes.js')(app); 
require('./app/routing/htmlRoutes.js')(app);

// LISTENER
app.listen(PORT, function() {
	console.log("App listening on PORT: " + PORT);
});