var MongoClient = require('mongodb').MongoClient,
	ObjectID    = require('mongodb').ObjectID;

//Attributes
function User() {
	this._id       = null;
	this.name      = null;
	this.firstname = null;
	this.email     = null;
	this.password  = null;
	this.admin     = false;
};
//Non-statics methods
User.prototype = {
	init: function (obj)
	{
		for (var fld in obj) {
			if (obj.hasOwnProperty(fld)) {
				this[fld] = obj[fld];
			}
		}
	},
	save: function() 
	{
		var object = this;

        MongoClient.connect('mongodb://localhost/booking', function(err, db) {

            if (err) {
                return console.log(err);
            }

			var collection = db.collection('users');

			if (! object._id) {
				collection.insert(object, {w : 1}, function(err, result) {});
			} else {
				collection.save(object, {w : 1}, function(err, result) {});
			}
        });
	},
	remove: function()
	{
		var object = this;

		MongoClient.connect('mongodb://localhost/booking', function(err, db) {
			if (err) {
				return console.log(err);
			}

			var collection = db.collection('users');

			collection.remove({ _id : object._id }, {w : 1}, function(err, result) {});
		});
	},
};
//Statics methods
User.login = function(email, password, callback)
{
	MongoClient.connect('mongodb://localhost/booking', function(err, db) {

		if (err) {
			return console.log(err);
		}

		var users = db.collection('users');

		users.findOne({email:email, password:password}, function(err, item) {
			var user = {}

			if (! err && item) {

				user = new User();
				user.init(item);
			}

			callback(user, err);
		});

	});
};

module.exports = User;

