var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var Discussion = require('../models/discussion');
var Question = require('../models/question');
var Answer = require('../models/answer');

router.get('/:id', ensureAuthenticated, function(req, res){

	Question.find({ 'discussionId':req.body.discussion}, function(err, docs2){

	});
	res.render("question", {question:  ""});
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