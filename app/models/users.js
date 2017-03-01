var MongoClient = require('mongodb').MongoClient;

module.exports = {

    login : function(credentials) {
        MongoClient.connect('mongodb://localhost/booking', function(err, db) {

            if (err) {
                return console.log(err);
            }

            var user = db.collection('users');

            user.findOne({email:credentials.email, password:credentials.password}, function(err, item) {
                if(err) {
                    return "Bonjour, Vos identifiants ne sont pas corrrect allez vous faire enculer CORDIALEMENT";
                }
                return item;
            });

        });
    },

};
