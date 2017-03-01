var express  = require('express'),
    router   = express.Router(),
    userModel = require('../models/users');


router.post('/', function(req, res, next) {
    var credentials = {
        email: req.body.email,
        password: req.body.password
    };
    console.log(userModel)
    var t = userModel.login(credentials);
    console.log(t);

});

module.exports = router;
