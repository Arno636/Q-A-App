var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

router.get('/create', function(req, res){
	res.render('create');
});


var Discussion = require('../models/discussion');

var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// POST /login gets urlencoded bodies
router.post('/create', urlencodedParser, function (req, res) {
  // if (!req.body) return res.sendStatus(400)

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

module.exports = router;
