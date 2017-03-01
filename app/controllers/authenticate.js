var express = require('express'),
    router  = express.Router(),
    User    = require('../models/user');

router.get('/', function(req, res, next) {
	res.render('login', {title: 'Se connecter'});
})
router.post('/check', function(req, res, next) {
	var user = new User();

	user.email = req.body.email;
	user.password = req.body.password;

	var checkLogin = user.login();
    console.log(user);

	if (checkLogin) {
		res.redirect('/logement');
	} else {
		res.redirect('/');
	}

});

module.exports = router;
