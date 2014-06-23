var mongo = require('mongodb');
//var monk = require('monk');
var url = require('url');
//var db = mongo('http://localhost:27017/al'); //http://'localhost:27017/al' or mongo.url (BlueMix)
//var collection = db.get('messages');


var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;

MongoClient.connect('mongodb://localhost:27017/al', function(err, db) {
    //if(err) throw err;

    var collection = db.collection('test_messages');

exports.findAll = function(req, res) {
	collection.find({}, function(err, result){
	
	prettyData= JSON.stringify(result);
	res.render('index', {text:prettyData});
 });   
};

// Get data by id
exports.getById = function(req, res) {
	var id = req.params.id;
	console.log(id);
	collection.findById(id, function(err, result){
		if (err) res.json(500, err);
		else if (result) res.json(result);
		else res.json(404);
	});
};
 
 
 
// Create data
exports.createData = function(req, res) {
	var newData = req.body;
	collection.insert(newData, function(err, result){
		console.log(result);
		if (err) res.json(500, err);
		else res.json(201, result);
	});
};


// Update data
exports.updateData = function(req, res) {
	var id = req.params.id;
	var body = req.body;
	console.log(body);

	delete body._id;
	collection.findAndModify({_id: id}, {$set: body}, {multi:false}, function(err, result){
		if (err) res.json(500, err);
		else if (result) res.json(result);
		else res.json(404);
	});
};
 
// Delete data
exports.delData = function(req, res) {
	var id = req.params.id;
	collection.remove({_id: id}, function(err){
		if (err) res.json(500, err);
		else res.json(204);
	});
};

});


// VCAP_SERVICES contains all the credentials of services bound to
// this application. For details of its content, please refer to
// the document or sample of each service.
var services = JSON.parse(process.env.VCAP_SERVICES || "{}");
// TODO: Get service credentials and communicate with bluemix services.
//var mongo = services['mongodb-2.2'][0].credentials;

