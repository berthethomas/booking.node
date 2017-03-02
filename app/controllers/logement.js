var express  = require('express'),
	router   = express.Router(),
  model = require('../models/logement');

//affiche la map avec tout les hotels
router.get('/', function(req, res, next) {
  model.findAll(function(logements){
		res.render('index', {logements:logements});
	});
})
//affiche le formulaire
router.get('/add', function(req, res, next) {
	res.render('formLogement', {title: 'Ajouter un logement', action: '/logement/add/save'});
})
//enregistre les données
.post('/add/save', function(req, res, next) {
	if(req.body.title && req.body.title.length > 5){
		var titre = req.body.title;
	} else{
		var titre = null;
	}

	if(req.body.description && req.body.description.length > 5){
		var description = req.body.description;
	} else{
		var description = null;
	}

	if(req.body.image && req.body.image.length > 5){
		var image = req.body.image;
	} else{
		var image = null;
	}

	if(req.body.email && req.body.email.length > 5){
		var email = req.body.email;
	} else{
		var email = null;
	}


	if(req.body.adresse && req.body.adresse.length > 5){
		var adresse = req.body.adresse;
	} else{
		var adresse = null;
	}

	if(req.body.cp && req.body.cp.length === 5){
		var cp = req.body.cp;
	} else{
		var cp = null;
	}

	if(req.body.ville && req.body.ville.length > 2){
		var ville = req.body.ville;
	} else{
		var ville = null;
	}

	if(req.body.tarif && req.body.tarif.length > 1){
		var tarif = req.body.tarif;
	} else{
		var tarif = null;
	}

	if(titre && adresse && cp && ville && tarif && email){
		var logement = {
	    titre : titre,
	    description : description,
	    image : image,
			email : email,
	    adresse : adresse,
	    cp : cp,
	    ville : ville,
	    tarif : tarif
	  };

	  model.addLogement(logement);
		res.redirect('/logement/add');
	} else {
		res.redirect('/logement/add?error=true');
	}



})

.get('/info/:id', function(req, res, next) {
	model.findById(req.params.id, function(logement){
		console.log(logement);
		res.render('detailLogement', {title: 'Info sur le logement', logement:logement});
	});

})



module.exports = router;
