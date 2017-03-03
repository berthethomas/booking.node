var MongoClient = require('mongodb').MongoClient,
    User = require('./models/user'),
    Logement = require('./models/logement');

MongoClient.connect('mongodb://localhost/booking', function(err, db) {
    db.dropDatabase();

    db.createCollection('users');
    db.createCollection('logement');
    db.createCollection('reservations');

    var users = [
        {name: 'Booking', password: "secret", email: 'booking@example.fr', firstname: 'Booking', password: 'secret', admin: true},
        {name: "Clay Donaldson", password: "secret", email: "claydonaldson@zillacon.com", firstname: "Charlotte"},
        {name: "Jenny Noble", password: "secret", email: "jennynoble@zillacon.com", firstname: "Anderson"},
        {name: "Gould Avila", password: "secret", email: "gouldavila@zillacon.com", firstname: "Weeks"},
        {name: "Mia Dunn", password: "secret", email: "miadunn@zillacon.com", firstname: "Moss"},
        {name: "Erna Contreras", password: "secret", email: "ernacontreras@zillacon.com", firstname: "Gracie"},
        {name: "Tate Burch", password: "secret", email: "tateburch@zillacon.com", firstname: "Sandy"},
        {name: "Lesley Montgomery", password: "secret", email: "lesleymontgomery@zillacon.com", firstname: "Bright"},
        {name: "Lindsay Hobbs", password: "secret", email: "lindsayhobbs@zillacon.com", firstname: "Sylvia"},
        {name: "Mcfadden Castaneda", password: "secret", email: "mcfaddencastaneda@zillacon.com", firstname: "Lora"},
        {name: "Hilary Hooper", password: "secret", email: "hilaryhooper@zillacon.com", firstname: "Fernandez"},
        {name: "Eleanor Robles", password: "secret", email: "eleanorrobles@zillacon.com", firstname: "Gwen"},
        {name: "Jimmie Saunders", password: "secret", email: "jimmiesaunders@zillacon.com", firstname: "Patrica"},
        {name: "Farley Compton", password: "secret", email: "farleycompton@zillacon.com", firstname: "Mcintosh"},
        {name: "Grant Snyder", password: "secret", email: "grantsnyder@zillacon.com", firstname: "Guerrero"},
        {name: "Tessa Walls", password: "secret", email: "tessawalls@zillacon.com", firstname: "Malone"},
        {name: "Rosalyn Burks", password: "secret", email: "rosalynburks@zillacon.com", firstname: "Reilly"},
        {name: "Hinton Mcgee", password: "secret", email: "hintonmcgee@zillacon.com", firstname: "Castaneda"},
        {name: "Garrett Luna", password: "secret", email: "garrettluna@zillacon.com", firstname: "Doreen"},
        {name: "Bridget Fitzpatrick", password: "secret", email: "bridgetfitzpatrick@zillacon.com", firstname: "Robert"},
        {name: "Sutton Aguilar", password: "secret", email: "suttonaguilar@zillacon.com", firstname: "Ines"},
        {name: "Singleton Guthrie", password: "secret", email: "singletonguthrie@zillacon.com", firstname: "Dominique"},
        {name: "Belinda Grant", password: "secret", email: "belindagrant@zillacon.com", firstname: "Matilda"},
        {name: "Bird Mcguire", password: "secret", email: "birdmcguire@zillacon.com", firstname: "Mcguire"},
        {name: "Obrien Holden", password: "secret", email: "obrienholden@zillacon.com", firstname: "Rochelle"},
        {name: "Harrell Flowers", password: "secret", email: "harrellflowers@zillacon.com", firstname: "Roberts"},
        {name: "Brooks Goodwin", password: "secret", email: "brooksgoodwin@zillacon.com", firstname: "Dominguez"},
        {name: "Opal Osborn", password: "secret", email: "opalosborn@zillacon.com", firstname: "Hardy"},
        {name: "Miranda Peterson", password: "secret", email: "mirandapeterson@zillacon.com", firstname: "Laverne"},
        {name: "Deidre Hudson", password: "secret", email: "deidrehudson@zillacon.com", firstname: "Morrow"},
        {name: "Lawson Bowen", password: "secret", email: "lawsonbowen@zillacon.com", firstname: "Leach"}
    ];

    for(var i=0; i<=users.length-1; i++) {
        var user = new User();
        user.init(users[i]);
        user.save();
    }


    var logements = [
        {email: "contact@example.fr", titre: "Frosnex", description: 698, adresse: "164 Liberty Avenue, Shaft, Mississippi", cp: 27117, ville: "Coldiron", tarif: 752},
        {email: "contact@example.fr", titre: "Intradisk", description: 870, adresse: "448 Grand Avenue, Kempton, Texas", cp: 19579, ville: "Levant", tarif: 85},
        {email: "contact@example.fr", titre: "Ersum", description: 153, adresse: "891 Conduit Boulevard, Thatcher, Kentucky", cp: 24708, ville: "Urbana", tarif: 696},
        {email: "contact@example.fr", titre: "Songlines", description: 114, adresse: "379 Richmond Street, Silkworth, Ohio", cp: 96969, ville: "Warsaw", tarif: 737},
        {email: "contact@example.fr", titre: "Intrawear", description: 243, adresse: "965 Sharon Street, Eden, North Carolina", cp: 8010, ville: "Convent", tarif: 1958},
        {email: "contact@example.fr", titre: "Hivedom", description: 463, adresse: "651 Wyckoff Avenue, Greenwich, District Of Columbia", cp: 4340, ville: "Calpine", tarif: 1644},
        {email: "contact@example.fr", titre: "Insurity", description: 962, adresse: "155 Bassett Avenue, Masthope, California", cp: 20709, ville: "Mahtowa", tarif: 510},
        {email: "contact@example.fr", titre: "Interfind", description: 602, adresse: "404 Argyle Road, Nogal, Northern Mariana Islands", cp: 2615, ville: "Beechmont", tarif: 1859},
        {email: "contact@example.fr", titre: "Terrasys", description: 987, adresse: "123 Canda Avenue, Fingerville, Pennsylvania", cp: 95712, ville: "Cowiche", tarif: 1683},
        {email: "contact@example.fr", titre: "Niquent", description: 254, adresse: "492 Bayard Street, Wilsonia, Michigan", cp: 25923, ville: "Whitestone", tarif: 134},
        {email: "contact@example.fr", titre: "Netbook", description: 188, adresse: "627 Apollo Street, Zeba, Palau", cp: 12973, ville: "Kraemer", tarif: 825},
        {email: "contact@example.fr", titre: "Marqet", description: 411, adresse: "268 Desmond Court, Gulf, Alaska", cp: 38030, ville: "Kennedyville", tarif: 925},
        {email: "contact@example.fr", titre: "Terragen", description: 502, adresse: "254 Coyle Street, Richmond, Delaware", cp: 78752, ville: "Avoca", tarif: 1932},
        {email: "contact@example.fr", titre: "Halap", description: 557, adresse: "814 Herzl Street, Faywood, Vermont", cp: 39485, ville: "Robinette", tarif: 1067},
        {email: "contact@example.fr", titre: "Gallaxia", description: 649, adresse: "251 Dupont Street, Muir, Illinois", cp: 43248, ville: "Barrelville", tarif: 1323},
        {email: "contact@example.fr", titre: "Insurety", description: 893, adresse: "786 Chestnut Avenue, Cawood, Massachusetts", cp: 38010, ville: "Whipholt", tarif: 417},
        {email: "contact@example.fr", titre: "Koffee", description: 199, adresse: "284 Central Avenue, Jacksonburg, Louisiana", cp: 37454, ville: "Dola", tarif: 1061},
        {email: "contact@example.fr", titre: "Bedder", description: 525, adresse: "797 Seagate Terrace, Stockwell, New Hampshire", cp: 9005, ville: "Gardners", tarif: 88},
        {email: "contact@example.fr", titre: "Synkgen", description: 392, adresse: "918 Victor Road, Hillsboro, Indiana", cp: 21756, ville: "Dupuyer", tarif: 1641},
        {email: "contact@example.fr", titre: "Emtrak", description: 496, adresse: "133 Herkimer Place, Romeville, Marshall Islands", cp: 1633, ville: "Marienthal", tarif: 368},
        {email: "contact@example.fr", titre: "Toyletry", description: 563, adresse: "326 Brighton Court, Graniteville, Iowa", cp: 28027, ville: "Heil", tarif: 1003},
        {email: "contact@example.fr", titre: "Rocklogic", description: 190, adresse: "152 Tompkins Place, Campo, West Virginia", cp: 4608, ville: "Loveland", tarif: 878},
        {email: "contact@example.fr", titre: "Datagen", description: 669, adresse: "234 Williams Avenue, Delwood, American Samoa", cp: 7993, ville: "Bynum", tarif: 1532},
        {email: "contact@example.fr", titre: "Xeronk", description: 650, adresse: "764 Clove Road, Lupton, Washington", cp: 82805, ville: "Noxen", tarif: 1598},
        {email: "contact@example.fr", titre: "Genekom", description: 119, adresse: "374 Bijou Avenue, Freelandville, Kansas", cp: 20576, ville: "Harborton", tarif: 1758},
        {email: "contact@example.fr", titre: "Wrapture", description: 343, adresse: "305 Cooper Street, Finderne, North Dakota", cp: 4193, ville: "Glasgow", tarif: 147},
        {email: "contact@example.fr", titre: "Nimon", description: 990, adresse: "854 Hornell Loop, Deseret, New Jersey", cp: 4994, ville: "Sultana", tarif: 334},
        {email: "contact@example.fr", titre: "Trasola", description: 154, adresse: "856 Newkirk Avenue, Templeton, Montana", cp: 41798, ville: "Clara", tarif: 1339},
        {email: "contact@example.fr", titre: "Boink", description: 243, adresse: "862 Summit Street, Juarez, Tennessee", cp: 15912, ville: "Gasquet", tarif: 1552},
        {email: "contact@example.fr", titre: "Newcube", description: 728, adresse: "932 Woods Place, Westwood, Arkansas", cp: 77803, ville: "Mulino", tarif: 1847},
        {email: "contact@example.fr", titre: "Eventix", description: 190, adresse: "187 Columbia Place, Unionville, Utah", cp: 67176, ville: "Springville", tarif: 910},
        {email: "contact@example.fr", titre: "Exoplode", description: 616, adresse: "890 Gold Street, Ellerslie, Guam", cp: 53800, ville: "Hartsville/Hartley", tarif: 165},
        {email: "contact@example.fr", titre: "Ecraze", description: 375, adresse: "184 Dahill Road, Frierson, Colorado", cp: 92112, ville: "Wanamie", tarif: 319},
        {email: "contact@example.fr", titre: "Bleeko", description: 745, adresse: "421 Ocean Avenue, Coultervillle, Hawaii", cp: 96680, ville: "Brethren", tarif: 1539},
        {email: "contact@example.fr", titre: "Memora", description: 360, adresse: "797 River Street, Goochland, Georgia", cp: 13022, ville: "Sparkill", tarif: 1852},
        {email: "contact@example.fr", titre: "Dogspa", description: 560, adresse: "347 Cypress Court, Rushford, Maine", cp: 81135, ville: "Toftrees", tarif: 51},
        {email: "contact@example.fr", titre: "Lunchpod", description: 202, adresse: "920 Anchorage Place, Kapowsin, Florida", cp: 43763, ville: "Rockhill", tarif: 1493},
        {email: "contact@example.fr", titre: "Musix", description: 318, adresse: "391 Boerum Street, Dellview, Oregon", cp: 27877, ville: "Cressey", tarif: 707},
        {email: "contact@example.fr", titre: "Aquazure", description: 977, adresse: "103 National Drive, Movico, New York", cp: 2581, ville: "Byrnedale", tarif: 251},
        {email: "contact@example.fr", titre: "Urbanshee", description: 439, adresse: "430 Vista Place, Trexlertown, Wyoming", cp: 80783, ville: "Kerby", tarif: 615},
        {email: "contact@example.fr", titre: "Namebox", description: 267, adresse: "525 Stratford Road, Defiance, Missouri", cp: 88043, ville: "Boonville", tarif: 1729},
        {email: "contact@example.fr", titre: "Savvy", description: 108, adresse: "664 Ridgecrest Terrace, Cascades, South Carolina", cp: 5940, ville: "Elbert", tarif: 933},
        {email: "contact@example.fr", titre: "Waterbaby", description: 321, adresse: "130 Madoc Avenue, Finzel, Virgin Islands", cp: 9150, ville: "Clarence", tarif: 1480},
        {email: "contact@example.fr", titre: "Mangelica", description: 362, adresse: "218 Oriental Boulevard, Waverly, Arizona", cp: 15936, ville: "Frank", tarif: 1318},
        {email: "contact@example.fr", titre: "Ontagene", description: 890, adresse: "660 Bay Avenue, Shindler, Rhode Island", cp: 5835, ville: "Stollings", tarif: 1078},
    ];

    for(var i=0; i<=logements.length-1; i++) {
        var logement = new Logement();
        logement.init(logements[i]);
        logement.save();
    }

});
