var MongoClient = require('mongodb').MongoClient;

function User() {
	this._id       = null;
	this.name      = null;
	this.firstname = null;
	this.email     = null;
	this.password  = null;
	this.admin     = false;
};
User.prototype = {
	init: function (obj)
	{
		for (var fld in obj) {
			if (obj.hasOwnProperty(fld)) {
				this[fld] = obj[fld];
			}
		}
	},
    login: function(callback)
	{
		var object = this;

        MongoClient.connect('mongodb://localhost/booking', function(err, db) {

            if (err) {
                return console.log(err);
            }

            var users = db.collection('users');

            users.findOne({email:object.email, password:object.password}, function(err, item) {
				var user = {}

                if (! err && item) {

					object.init(item);	
					user = object;
				}

				callback(user, err);
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

