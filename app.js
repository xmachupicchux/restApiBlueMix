
var express = require('express');
var url = require('url');
dataExt = require('./routes/serverExtend');
// setup middleware
var app = express();
app.use(app.router);
app.use(express.errorHandler());
 app.use(express.bodyParser());
app.use(express.static(__dirname + '/public')); //setup static public directory
app.set('view engine', 'jade');
app.set('views', __dirname + '/views'); //optional since express defaults to CWD/views


//Routes
app.get('/data',  dataExt.findAll);
app.get('/data/:id', dataExt.getById);
app.post('/data', dataExt.createData);
app.put('/data/:id', dataExt.updateData);
app.del('/data/:id', dataExt.delData);




// VCAP_APPLICATION contains useful information about a deployed application.
var appInfo = JSON.parse(process.env.VCAP_APPLICATION || "{}");
// TODO: Get application information and use it in your app.




// The IP address of the Cloud Foundry DEA (Droplet Execution Agent) that hosts this application:
var host = (process.env.VCAP_APP_HOST || 'localhost');
// The port on the DEA for communication with the application:
var port = (process.env.VCAP_APP_PORT || 3000);
// Start server
app.listen(port, host);
console.log('App started on port ' + port);

