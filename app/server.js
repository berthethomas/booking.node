#!/usr/bin/env node

var express  = require('express'),
	path	 = require('path');

//controllers
var login    = require('./controllers/login'),
	register = require('./controllers/register');

//application
var	app = express();

app.set('views', path.join(__dirname + '/views'));
app.set('view engine', 'hbs');

//routes
app.use('/', login)
.use('/register', register);

//public files
app.use(express.static(path.join(__dirname, '/../public')));

app.listen(8000);
module.exports = app;
