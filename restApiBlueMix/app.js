var express = require('express');
var jade = require("jade");
dataExt = require('./routes/serverExtend');

var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser());
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

//Routes
app.get('/data',  dataExt.findAll);
app.get('/data/:id', dataExt.getById);
app.post('/data', dataExt.createData);
app.put('/data/:id', dataExt.updateData);
app.del('/data/:id', dataExt.delData);



 
app.listen(3000);
console.log('Listening on port 3000...');