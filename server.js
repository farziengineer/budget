var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/budget');

var Schema = mongoose.Schema;

var Budget_Schema = new Schema({
		task_name: String,
		desciption: String,
		amount: Number,
		created_time: Date, 
		updated_time: Date,


});

mongoose.model('budget', Budget_Schema);
var budget = mongoose.model('budget');

var app = express(); 
app.use(bodyParser.json());


app.use(express.static(__dirname + '/public')) ;


// ROUTES

// GET request
app.get('/api/budgets', function(req, res) {
	budget.find(function(err, docs) {
		res.send(docs);
	});
});


// POST request
app.post('/api/budgets', function(req, res) {

	var budgetx = new budget(req.body);
	budgetx.save(function(err, doc) {
		res.send(doc);
	});
});

// Delete request
app.delete('/api/budgets/:id', function(req, res) {
	budget.remove({_id: req.params.id}, function(err, doc) {
		res.send({_id: req.params.id});
	});
});

// Edit request
app.put('/api/budgets/:id', function(req, res) {
	alert("hsd");
	budget.update({_id: req.params.id}, req.body, function(err) {
		res.send({_id: req.params.id});
	});
});



var port = 3000;

app.listen(port);