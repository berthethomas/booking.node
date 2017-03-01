var express  = require('express'),
	router   = express.Router();

router.get('/', function(req, res, next) {
	res.render('formLogement', {title: 'Ajouter un logement'});
});

module.exports = router;
