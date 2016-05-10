var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var Discussion = require('../models/discussion');

router.get('/create', ensureAuthenticated, function(req, res){
	res.render('create');
});

router.get('/:id', ensureAuthenticated, function(req, res){
	  Discussion.count({ '_id': req.params.id }, function(err, count) {
           if(count == 1){
           		Discussion.find({ '_id': req.params.id }, function(err, docs) {
           			res.render('discussion', {"title": docs[0].title, "message": docs[0].message, "userId": docs[0].userId});
           		});
           }else{
           		res.render("404");
           }
      });
});


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
	  	res.redirect('/discussions/' + room.id);
	  }
	});
});

function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated())
    {
		return next();
	} 
    else 
    {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}



module.exports = router;
