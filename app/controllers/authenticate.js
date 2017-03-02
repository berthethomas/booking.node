var express = require('express'),
    router  = express.Router(),
    User    = require('../models/user');



router.get('/', function(req, res, next) {
	res.render('login', {title: 'Se connecter'});
});
router.post('/check', function(req, res, next) {
	var user = new User();

	user.email = req.body.email;
	user.password = req.body.password;

	var checkLogin = user.login(function (response) {
		if (response.success) {
			if (response.user instanceof User) {
                req.flash('success', 'Bienvenue, vous êtes connecté');
                res.redirect('/logement');
			} else {
                req.flash('error', 'Credentials invalid');
				res.redirect('/', 400, {title: 'Se connecter'});
			}
		} else {
            req.flash('error', 'Impossible de contact la BDD');
			res.redirect('/', 500, {title: 'Se connecter'});
		}
	});

});

module.exports = router;
