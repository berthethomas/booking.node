var MongoClient = require('mongodb').MongoClient;

function User() {
	this.name = '';
	this.firstname = '';
	this.email = '';
	this.password = '';
};
User.prototype = {

    login: function(callback)
	{
		var user = this;

        MongoClient.connect('mongodb://localhost/booking', function(err, db) {

            if (err) {
                return console.log(err);
            }

            var users = db.collection('users');

            users.findOne({email:user.email, password:user.password}, function(err, item) {
				var response = {success: false, user: {}}

                if (! err) {
					response.success = true;

					if (item) {
						console.log(item);
						user.name      = item.name;
						user.firstname = item.firstname;

						response.user = user;
					}
				}

				callback(response);
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
	},
};

module.exports = User;

