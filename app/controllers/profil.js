var express  = require('express'),
	router   = express.Router(),
	User     = require('../models/user');

router.get('/:id', function(req, res, next){
	User.findById(req.params.id, function(user){
		res.render('register', {title: 'Modification de votre profil', user: user, isEditing: true, action: '/profil/save'});
	})
})
.post('/save', function(req, res, next) {
	if (req.body.id) {
		User.findById(req.body.id, function(user){
			var error      = false;
			var message    = '';
			var attributes = {
					name      : req.body.name,
					firstname : req.body.firstname,
					email     : req.body.email,
				};

				
			switch(true) {
				case (user.password != req.body.password):
					error   = true;
					message = 'Le mot de passe saisi n\'est pas correcte';

					break;
				case (! req.body.name || ! req.body.firstname || ! req.body.email):
					error   = true;
					message = 'Certains champs obligatoires n\'ont pas été renseignés';

					break;
				case (req.body.newPassword && req.body.newPassword.length > 1 && req.body.newPassword != req.body.confirm):
					error   = true;
					message = 'Le nouveau mot de passe et la confirmation ne correspondent pas';

					break;
			} 

			if (req.body.newPassword && req.body.newPassword.length > 1 && req.body.newPassword == req.body.confirm) {
				attributes.password = req.body.newPassword;
			}

			user.init(attributes);

			if (! error) {
				user.save(function(savedUser, err) {
					if (! err) {
						req.flash('success', 'Votre profil à bien été mis à jour');
						res.redirect('/');
					} else {
						req.flash('error', 'Une erreur est survenue, veuillez contacter sur support');
						res.render('register', {title: 'S\'inscrire', user:user, isEditing: true, action: '/profil/save'});
					}
				}); 
			} else {
				req.flash('error', message);
				res.render('register', {title: 'S\'inscrire', user:user, isEditing: true, action: '/profil/save'});
			}
		});
	} else {
		req.flash('error', 'Une erreur est survenue, veuillez contacter sur support');
		res.render('register', {title: 'S\'inscrire', user:user, isEditing: true, action: '/profil/save'});
	}
});

module.exports = router;

