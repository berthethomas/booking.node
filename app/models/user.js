var MongoClient = require('mongodb').MongoClient;

function User() {
	this.name = '';
	this.firstname = '';
	this.email = '';
	this.password = '';
};
User.prototype = {

    login: function()
	{
		var user = this;

        MongoClient.connect('mongodb://localhost/booking', function(err, db) {

            if (err) {
                return console.log(err);
            }

            var user = db.collection('users');

            user.findOne({email:user.email, password:user.password}, function(err, item) {
                if(err) {
                    return false;
                }

				console.log(item);
                user.name      = item.name;
				user.firstname = item.firstname;

				return true;
            });

        });
    },
	save: function() 
	{
		var user = this;

        MongoClient.connect('mongodb://localhost/booking', function(err, db) {

            if (err) {
                return console.log(err);
            }

			var collection = db.collection('users');

			collection.insert(user, {w : 1}, function(err, result) {});
        });
	}
};

module.exports = User;

