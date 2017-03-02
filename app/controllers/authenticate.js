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

	var checkLogin = user.login(function (user, err) {
		if (! err) {
			if (user instanceof User) {
                var session = req.session;
                session.auth = true;
                session.user = user;
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
