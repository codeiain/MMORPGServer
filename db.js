var mongodb = require('mongodb'),
    MongoClient = mongodb.MongoClient;

var databaseConfig = require('./config/database');
console.log("clearing Test DB");
MongoClient.connect(databaseConfig.test, function(err, db) {
    db.listCollections().toArray(function(err, collInfos) {
        if (err) {
            process.exit(1);
        }
        for (var x = 0; x < collInfos.length; x++) {
            var name = collInfos[x].name;
            db.collection(name).remove({}, function(err, numberRemoved) {
                if (x == collInfos.length) {
                    process.exit(0);
                }
                if (err) {
                    process.exit(1);
                }
            });

        }

    });
});