var express  = require('express'),
    router   = express.Router();

router.post('/', function(req, res, next) {
    console.log(req);
});

module.exports = router;