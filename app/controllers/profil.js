var express  = require('express'),
	router   = express.Router(),
	User     = require('../models/user');

.get('/:id', function(req, res, next){
	User.findById(req.params.id, function(user){
		res.render('register', {title: 'Modification de votre profil', user:user, action: '/profil/save'});
	})
})
.post('/save', function(req, res, next) {
	if (req.body.id) {
		User.findById(req.body.id, function(user){
		var attributes = {
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
						res.render('register', {title: 'S\'inscrire', user:user, action: '/profil/save'});
					}
				}); 
			} else {
				req.flash('error', 'vos mots de passes ne correspondent pas');
				res.render('register', {title: 'S\'inscrire', user:user, action: '/profil/save'});
			}
		} else {
			req.flash('error', 'Certains champs obligatoires n\'ont pas été renseignés');
			res.render('register', {title: 'S\'inscrire', user:user, action: '/profil/save'});
		}
	} else {
		req.flash('error', 'Une erreur est survenue, veuillez contacter sur support');
		res.render('register', {title: 'S\'inscrire', user:user, action: '/profil/save'});
	}
});

