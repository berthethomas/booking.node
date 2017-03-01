var express  = require('express'),
	router   = express.Router();

router.get('/', function(req, res, next) {
	res.render('register', {title: 'S\'inscrire'});
});

module.exports = router;

