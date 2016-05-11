var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var Discussion = require('../models/discussion');
var Question = require('../models/question');

router.get('/create', ensureAuthenticated, function(req, res){
	res.render('create');
});

router.get('/:id', ensureAuthenticated, function(req, res){
    Discussion.count({ '_id': req.params.id }, function(err, count){
        if(count == 1)
        {
            Discussion.find({ '_id': req.params.id }, function(err, docs){
                
                Question.find({ 'discussionId': docs[0].id }, function(err, docs2){
                    res.render('discussion', {"title": docs[0].title, "message": docs[0].message, "userId": docs[0].userId, "question": docs2});
                });
                
           	});
        }
        else
        {
            res.render("404");
        }
    });
});

/*
router.get('/:id', ensureAuthenticated, function(req, res){
    Discussion.count({ '_id': req.params.id }, function(err, count){
        if(count == 1)
        {
            Discussion.find({ '_id': req.params.id }, function(err, docs){
                
                Question.find({ 'discussionId': docs[0].id }, function(err, docs2){
                    
                    Answer.find({ 'questionId': docs2[0].id }, function(err, docs3){
                        res.render('discussion', {"title": docs[0].title, "message": docs[0].message, "userId": docs[0].userId, "question": docs2, "answer": docs3});
                    });
            
                });
                
           	});
        }
        else
        {
            res.render("404");
        }
    });
});*/

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

// POST for question
router.post('/:id', urlencodedParser, function (req, res) {
    
    var question = new Question({question: req.body.question , discussionId: req.params.id});

	//save model to MongoDB
	question.save(function (err,room) {
	  if (err) {
			return err;
	  }
	  else {
	  	console.log("A new question is opened with id: " + room.id);
	  	res.redirect(req.params.id);
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
