var mongo = require('mongodb');
var monk = require('monk');
var url = require('url');
var db = mongo('http://localhost:27017'); //'localhost:27017/al'
var collection = db.get('messages');


//Get all data's
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





