var express  = require('express'),
	router   = express.Router(),
	Logement = require('../models/logement');

//affiche la map avec tout les hotels
router.get('/', function(req, res, next) {
	Logement.findAll(function(logements){
		res.render('index', {logements:logements});
	});
})
//affiche le formulaire
router.get('/add', function(req, res, next) {
	res.render('formLogement', {title: 'Ajouter un logement', action: '/logement/add/save'});
})
//enregistre les données
.post('/add/save', function(req, res, next) {

	var attributes = {
		titre       : null,
		description : null,
		image       : null,
		email       : null,
		adresse     : null,
		cp          : null,
		ville       : null,
		tarif       : null
	};

	if (req.body.title && req.body.title.length > 5){
		attributes.titre = req.body.title;
	}

	if (req.body.description && req.body.description.length > 5){
		attributes.description = req.body.description;
	}

	if (req.body.image && req.body.image.length > 5){
		attributes.image = req.body.image;
	}

	if (req.body.email && req.body.email.length > 5){
		attributes.email = req.body.email;
	}

	if (req.body.adresse && req.body.adresse.length > 5){
		attributes.adresse = req.body.adresse;
	}

	if (req.body.cp && req.body.cp.length === 5){
		attributes.cp = req.body.cp;
	}

	if (req.body.ville && req.body.ville.length > 2){
		attributes.ville = req.body.ville;
	}

	if (req.body.prix && req.body.prix.length > 1){
		attributes.tarif = req.body.prix;
	}

	if (attributes.titre && 
		attributes.adresse && 
		attributes.cp && 
		attributes.ville && 
		attributes.tarif && 
		attributes.email) {

		logement = new Logement();
		logement.init(attributes);

		logement.save();

		res.redirect('/logement/add');
	} else {
		res.redirect('/logement/add?error=true');
	}
})

.get('/info/:id', function(req, res, next) {
	Logement.findById(req.params.id, function(logement){
		res.render('detailLogement', {title: 'Info sur le logement', logement:logement});
	});

})

module.exports = router;
