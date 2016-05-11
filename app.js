var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var mongoose = require('mongoose');

var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);

mongoose.connect('mongodb://localhost/loginapp');

app.use(express.static(__dirname + '/assets'));

app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// Connect Flash
app.use(flash());

// Global Vars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

var routes = require('./routes/index');
var users = require('./routes/users');
var discussions = require('./routes/discussions');

app.use('/', routes);
app.use('/users', users);
app.use('/discussions', discussions);


// 	var id = 0;
// 	app.get('/discussion/:id', function (req, res) {

// 	id = req.params.id;
//   res.sendFile(__dirname + '/views/discussion.html');
// });

// var users = 0;
// io.on('connection', function(socket){
// 	socket.join(id);
// 	io.to(id).emit("connect", "hello");
// 	console.log("connect");
// });


http.listen(3000, function(){
  console.log('listening on *:3000');
});




