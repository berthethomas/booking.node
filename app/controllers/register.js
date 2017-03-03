var express = require('express'),
	router  = express.Router(),
	User    = require('../models/user');

router.get('/', function(req, res, next) {
	var user = new User();
	res.render('register', {title     : 'S\'inscrire',
							user      : user,
							isEditing : false,
							action    : '/register/save'});
})
.post('/save', function(req, res, next) {
	var user = new User(),
		attributes = {
			name      : req.body.name,
			firstname : req.body.firstname,
			email     : req.body.email,
			password  : req.body.password,
		};

	user.init(attributes);

	if (req.body.name &&
		req.body.firstname &&
		req.body.email &&
		req.body.password) {

		if (attributes.password == req.body.confirm) {
			user.save(function(savedUser, err) {
				if (! err) {
					req.flash('success', 'Vous vous êtes bien enregistré');
					res.redirect('/');
				} else {
					req.flash('error', 'Une erreur est survenue, veuillez contacter sur support');
					res.render('register', {title: 'S\'inscrire', user:user, isEditing: false, action: '/register/save'});
				}
			}); 
		} else {
			req.flash('error', 'vos mots de passes ne correspondent pas');
			res.render('register', {title: 'S\'inscrire', user:user, isEditing: false, action: '/register/save'});
		}
	} else {
		req.flash('error', 'Certains champs obligatoires n\'ont pas été renseignés');
		res.render('register', {title: 'S\'inscrire', user:user, isEditing: false, action: '/register/save'});
	}
});

module.exports = router;

