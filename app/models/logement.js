var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

module.exports = {
  findAll : function(callback) {
    MongoClient.connect('mongodb://localhost/booking', function(err, db) {
      if (err) {
        return console.log(err);
      }

      var collection = db.collection('logement');

      collection.find().toArray(function(err, data) {
        callback(data);
      });
    });
  },

  findById : function(id, callback) {
    MongoClient.connect('mongodb://localhost/booking', function(err, db) {
      if (err) {
        return console.log(err);
      }

      var obj_id = new ObjectID.createFromHexString(id);

      var collection = db.collection('logement');

      collection.findOne({_id:obj_id}, function(err, item) {
        //console.log(item);
        //return item;
        callback(item);
      });

    });
  },

  addLogement : function(formLogement) {
    MongoClient.connect('mongodb://localhost/booking', function(err, db) {
      if (err) {
        return console.log(err);
      }

      var collection = db.collection('logement');
      var logement = {
        titre : formLogement["titre"],
        description : formLogement["description"],
        image : formLogement["image"],
        adresse : formLogement["adresse"],
        cp : formLogement["cp"],
        ville : formLogement["ville"],
        tarif : formLogement["tarif"]
      };

      collection.insert(logement, {w : 1}, function(err, result) {});
    });
  },

  updateLogement : function(formLogement) {
    MongoClient.connect('mongodb://localhost/booking', function(err, db) {
      if (err) {
        return console.log(err);
      }

      var collection = db.collection('logement');
      var logement = {
        _id : formLogement["_id"],
        titre : formLogement["titre"],
        description : formLogement["description"],
        image : formLogement["image"],
        adresse : formLogement["adresse"],
        cp : formLogement["cp"],
        ville : formLogement["ville"],
        tarif : formLogement["tarif"]
      };

      collection.save(logement, {w : 1}, function(err, result) {});
    });
  },

  removeLogement : function(id) {
    MongoClient.connect('mongodb://localhost/booking', function(err, db) {
      if (err) {
        return console.log(err);
      }

      var obj_id = new ObjectID.createFromHexString(id);

      var collection = db.collection('logement');

      collection.remove({ _id : obj_id }, {w : 1}, function(err, result) {});
    });
  }
};
