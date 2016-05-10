var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Discussion = require('../models/discussion');

router.get('/', ensureAuthenticated, function(req, res){

	Discussion.find( function(err, docs) {
       	res.render('index', {data: docs});
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