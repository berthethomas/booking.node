var express = require('express'),
	router  = express.Router(),
	User    = require('../models/user');

router.get('/', function(req, res, next) {
	res.render('register', {title: 'S\'inscrire'});
})
.post('/save', function(req, res, next) {
	var user = new User();

	if (req.body.password == req.body.confirm) {
		user.name      = req.body.name;
		user.firstname = req.body.firstname;
		user.email     = req.body.email;
		user.password  = req.body.password;

		user.save(); 

		res.redirect('/');
	} else {
		res.redirect('/register');
	}
});

module.exports = router;

