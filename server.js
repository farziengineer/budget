var express = require('express');
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


var app = express(); 

app.use(express.static(__dirname + '/public')) ;

var port = 3000;

app.listen(port);