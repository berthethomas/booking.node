var MongoClient = require('mongodb').MongoClient,
	ObjectID    = require('mongodb').ObjectID;

//Attributes
function Logement() {
	this._id         = null;
	this.titre       = null;
	this.description = null;
	this.image       = null;
	this.email		 = null;
	this.adresse     = null;
	this.cp          = null;
	this.ville       = null;
	this.tarif       = null;
};
//Non-statics methods
Logement.prototype = {
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

			var collection = db.collection('logement');

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

			var collection = db.collection('logement');

			collection.remove({ _id : object._id }, {w : 1}, function(err, result) {});
		});
	},
};
//Statics methods
Logement.findAll = function(callback)
{
	MongoClient.connect('mongodb://localhost/booking', function(err, db) {
		if (err) {
			return console.log(err);
		}

		var collection = db.collection('logement');

		collection.find().toArray(function(err, data) {
			var logements = Array();

			for (i = 0; i < data.length; i++) {
				var logement = new Logement();
				logement.init(data[i]);

				logements.push(logement);
			}
			callback(logements);
		});
	});
};
Logement.findById = function(id, callback)
{
	MongoClient.connect('mongodb://localhost/booking', function(err, db) {
		if (err) {
			return console.log(err);
		}

		var collection = db.collection('logement'),
			obj_id = new ObjectID.createFromHexString(id);

		collection.findOne({_id:obj_id}, function(err, item) {
			var logement = new Logement();
			logement.init(item);

			callback(logement);
		});
	});
};

module.exports = Logement;
