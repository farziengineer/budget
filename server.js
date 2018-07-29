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

app.get('/api/budgets', function(req, res) {
	budget.find(function(err, docs) {
		res.send(docs);
	});
});

app.post('/api/budgets', function(req, res) {

	var budgetx = new budget(req.body);
	budgetx.save(function(err, doc) {
		res.send(doc);
	});
});



var port = 3000;

app.listen(port);