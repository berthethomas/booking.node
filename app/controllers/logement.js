var express  = require('express'),
	router   = express.Router(),
  model = require('../models/logement');

//affiche le formulaire
router.get('/add', function(req, res, next) {
	res.render('formLogement', {title: 'Ajouter un logement'});
})
//enregistre les données
.post('/add/save', function(req, res, next) {
  var logement = {
    titre : req.body.title,
    description : req.body.description,
    image : req.body.image,
    adresse : req.body.adresse,
    cp : req.body.cp,
    ville : req.body.ville,
    tarif : req.body.tarif
  };

  model.addLogement(logement);
  
  res.redirect('/logement/add');
});

module.exports = router;
