var express  = require('express'),
	router   = express.Router(),
	Logement = require('../models/logement'),
	multer   = require('multer'),
	fs       = require('fs-extra'),
	path     = require('path');


	var storage = multer.diskStorage({
	  destination: function (request, file, callback) {
	    callback(null, __dirname + '../../public/upload');
	  },
	  filename: function (request, file, callback) {
	    callback(null, file.originalname)
	  }
	});


//affiche la map avec tout les hotels
router.get('/map', function(req, res, next) {
	var session = req.session;
	Logement.findAll(function(logements){
		res.render('map', {title : "Carte", logements:logements, session:session});
	});
})
router.get('/', function(req, res, next) {
	var session = req.session;

	Logement.findAll(function(logements){
		var user = session.user;
		res.render('index', {title: "Accueil", logements:logements, user:user, session:session});
	});
})
//affiche le formulaire
router.get('/add', function(req, res, next) {
	var session = req.session;
	res.render('formLogement', {title: 'Ajouter un logement', action: '/logement/add/save', session:session});
})
//enregistre les données
.post('/add/save',multer({storage: storage}).single('image'), function(req, res, next) {

var upload = multer({storage: storage}).single('image');

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

	//if (req.body.title && req.body.title.length > 5){
		attributes.titre = req.body.title;
	//}

	if (req.body.description && req.body.description.length > 5){
		attributes.description = req.body.description;
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

	attributes.image = req.file;


	if (attributes.titre &&
		attributes.adresse &&
		attributes.cp &&
		attributes.ville &&
		attributes.tarif &&
		attributes.email) {

		logement = new Logement();
		logement.init(attributes);

		upload(req, res, function(err) {
	  if(err) {
	    console.log('Error Occured');
	    return;
	  }
	  res.end('Your File Uploaded');
	  })

		logement.save();

		res.redirect('/logement');

	} else {
		res.redirect('/logement/add?error=true');
	}
})

.get('/info/:id', function(req, res, next) {
	var session = req.session;
	Logement.findById(req.params.id, function(logement){
		res.render('detailLogement', {title: 'Info sur le logement', logement:logement, session:session});
	});

})

.get('/update/:id', function(req, res, next){
	var session = req.session;
	Logement.findById(req.params.id, function(logement){
		res.render('updateLogement', {title: 'Modification du logement', logement:logement, action: '/logement/update/save', session:session});
	})
})

.post('/update/save', function(req, res, next) {

	Logement.findById(req.body.id, function(logement){
		if (req.body.title && req.body.title.length > 5){
			logement.titre = req.body.title;
		}

		if (req.body.description && req.body.description.length > 5){
			logement.description = req.body.description;
		}

		if (req.body.image && req.body.image.length > 5){
			logement.image = req.body.image;
		}

		if (req.body.email && req.body.email.length > 5){
			logement.email = req.body.email;
		}

		if (req.body.adresse && req.body.adresse.length > 5){
			logement.adresse = req.body.adresse;
		}

		if (req.body.cp && req.body.cp.length === 5){
			logement.cp = req.body.cp;
		}

		if (req.body.ville && req.body.ville.length > 2){
			logement.ville = req.body.ville;
		}

		if (req.body.prix && req.body.prix.length > 1){
			logement.tarif = req.body.prix;
		}

		if (logement.titre &&
			logement.adresse &&
			logement.cp &&
			logement.ville &&
			logement.tarif &&
			logement.email) {

			logement.save();

			res.redirect('/logement/info/' +logement._id);
		} else {
			res.redirect('/logement/update?error=true');
		}

	});
})

.get('/delete/:id', function(req, res, next){
	Logement.findById(req.params.id, function(logement){
		logement.remove();
		res.redirect('/logement');
	})
})

module.exports = router;
