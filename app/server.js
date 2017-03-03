#!/usr/bin/env node

var express      = require('express'),
	path         = require('path'),
	flash        = require('express-flash'),
	cookieParser = require('cookie-parser'),
	session      = require('express-session');

//controllers
var register     = require('./controllers/register'),
	logement     = require('./controllers/logement'),
	authenticate = require('./controllers/authenticate'),
	profil       = require('./controllers/profil');

//application
var	app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodiess

app.set('views', path.join(__dirname + '/views'));
app.set('view engine', 'hbs');

//Flash message
app.use(cookieParser('secret'));
app.use(session({
    cookie: { maxAge: 6000000000, expires: false },
    saveUninitialized: true,
    resave: 'true',
    secret: 'secret',
	user: {},

}));
app.use(flash());

//routes
app.all('*',function(req, res, next){
	var session = req.session;

	if(session.auth || /^\/assets/.test(req.url) || req.url == '/'  || req.url == '/register' ||  req.url == '/register/save' || req.url == '/check') {
		next();
    } else {
        res.redirect('/')
    }
});
app.use('/', authenticate)
.use('/register', register)
.use('/logement', logement)
.use('/profil', profil)
.use('/logout', function (req, res, next) {
	req.session.destroy();
	res.redirect('/');
});




//public files
app.use(express.static(path.join(__dirname, '/../public')));

app.listen(8000);
module.exports = app;
