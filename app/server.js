#!/usr/bin/env node

var express  = require('express'),
	path	 = require('path'),
	flash = require('express-flash'),
	cookieParser = require('cookie-parser'),
	session = require('express-session');
//controllers
var login    = require('./controllers/login'),
	register = require('./controllers/register'),
	logement = require('./controllers/logement'),
	authenticate = require('./controllers/authenticate');

//application
var	app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.set('views', path.join(__dirname + '/views'));
app.set('view engine', 'hbs');

//Flash message
app.use(cookieParser('secret'));
app.use(session({
    cookie: { maxAge: 60000 },
    saveUninitialized: true,
    resave: 'true',
    secret: 'secret'
}));
app.use(flash());

//routes
app.use('/', authenticate)
.use('/register', register)
.use('/logement', logement);



//public files
app.use(express.static(path.join(__dirname, '/../public')));

app.listen(8000);
module.exports = app;
