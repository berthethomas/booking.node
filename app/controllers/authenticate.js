var express = require('express'),
    router  = express.Router(),
    User    = require('../models/user');

var connectionMessage = '';

router.get('/', function(req, res, next) {
	res.render('login', {title: 'Se connecter', message: connectionMessage});
})
router.post('/check', function(req, res, next) {
	var user = new User();

	user.email = req.body.email;
	user.password = req.body.password;

	var checkLogin = user.login(function (response) {
		if (response.success) {
			if (response.user instanceof User) {
				res.redirect('/logement');
			} else {
				connectionMessage = 'Vos informations de connexion ne sont pas correctes';
				res.render('login', {title: 'Se connecter', message: connectionMessage});
			}
		} else {
			connectionMessage = 'Une erreur est survenue, veuillez recommencer plus tard';
			res.render('login', {title: 'Se connecter', message: connectionMessage});
		}
	});

});

module.exports = router;
