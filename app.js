
var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var db;
var collection;
var url = require('url');
//dataExt = require('./routes/serverExtend');
// setup middleware
var app = express();
app.use(app.router);
app.use(express.errorHandler());
app.use(express.bodyParser());
app.use(express.static(__dirname + '/public')); //setup static public directory
app.set('view engine', 'jade');
app.set('views', __dirname + '/views'); //optional since express defaults to CWD/views


// Initialize connection once
MongoClient.connect("mongodb://localhost:27017/test", function(err, database) {
  if(err) throw err;

 db = database;
 

  
 // VCAP_APPLICATION contains useful information about a deployed application.
var appInfo = JSON.parse(process.env.VCAP_APPLICATION || "{}");
// TODO: Get application information and use it in your app.

// VCAP_SERVICES contains all the credentials of services bound to
// this application. For details of its content, please refer to
// the document or sample of each service.
var services = JSON.parse(process.env.VCAP_SERVICES || "{}");
// TODO: Get service credentials and communicate with bluemix services.
//var mongo = services['mongodb-2.2'][0].credentials;
  // The IP address of the Cloud Foundry DEA (Droplet Execution Agent) that hosts this application:
var host = (process.env.VCAP_APP_HOST || 'localhost');
// The port on the DEA for communication with the application:
var port = (process.env.VCAP_APP_PORT || 3000);
// Start server
app.listen(port, host);
console.log('App started on port ' + port);

});


app.get('/',  function(req, res) {
	db.collection('messages').find({}, function(err, result){
	prettyData= JSON.stringify(result);
	res.render('index', {text:prettyData});
 });   
});

// Create data
app.post('/data', function(req, res) {
	var newData = req.body;
	db.collection('messages').insert(newData, function(err, result){
		console.log(result);
		if (err) res.json(500, err);
		else res.json(201, result);
	});
});

// Get data by id
app.get('data:/id', function(req, res) {
	var id = req.params.id;
	console.log(id);
	db.collection('messages').findById(id, function(err, result){
		if (err) res.json(500, err);
		else if (result) res.json(result);
		else res.json(404);
	});
});
// Update data
app.put('/data/:id', function(req, res) {
	var id = req.params.id;
	var body = req.body;
	console.log(body);
	delete body._id;
	db.collection('messages').findAndModify({_id: id}, {$set: body}, {multi:false}, function(err, result){
		if (err) res.json(500, err);
		else if (result) res.json(result);
		else res.json(404);
	});
});
 
// Delete data
app.del('/data/:id', function(req, res) {
	var id = req.params.id;
	collection('messages').remove({_id: id}, function(err){
		if (err) res.json(500, err);
		else res.json(204);
	});
});














