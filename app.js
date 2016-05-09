var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();

mongoose.connect('mongodb://localhost/qanda');

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.use('/assets', express.static(__dirname + '/assets'));

app.get('/discussion/create', function (req, res) {
  res.sendFile(__dirname + '/views/create.html');
});

var Discussion = require(__dirname +'/models/discussion');


var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// POST /login gets urlencoded bodies
app.post('/discussion/create', urlencodedParser, function (req, res) {
  // if (!req.body) return res.sendStatus(400)

	//create new model
	var post = new Discussion({title: req.body.title , message: req.body.message, userId: 1});

	//save model to MongoDB
	post.save(function (err,room) {
	  if (err) {
			return err;
	  }
	  else {
	  	console.log("A new discussion is opened with id: " + room.id);
	  	res.redirect('/discussion/' + room.id);
	  }
	});
});



app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});