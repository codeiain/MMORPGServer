/**
 * This is a comment.
 */
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoSeed = require('mongo-seed');
var path = require('path');

var databaseConfig = require('./config/database');
var portsConfig = require('./config/ports')

var router = require('./app/routes');
var db = undefined;

var port = undefined;
var seedPath = path.resolve(__dirname + "/seed/");
var UI = require('./Ui.js');

var logger;
var socketServer = require('./socketServer');

switch (process.env.NODE_ENV) {
    case 'dev':
        console.log("using Dev DB");
        db = mongoose.connect(databaseConfig.dev);
        port = portsConfig.api.dev;
        console.log(portsConfig.api.dev);
        mongoSeed.load("localhost", 27017, "local-dev", seedPath, "dir", function (err) {
            if (err) {
                console.log('error seeding db: ' + err)
            }
        });
        break;
    case 'test':
        console.log("using Test DB");
        db = mongoose.connect(databaseConfig.test);
        port = portsConfig.api.test;
        mongoSeed.clear("localhost", 27017, "local-test", function (err) {
            console.log('cleared db');
            mongoSeed.load("localhost", 27017, "local-test", seedPath, "dir", function (err) {
                if (err) {
                    console.log('error seeding db: ' + err)
                } else {
                    console.log('seeded DB');
                }
            });
        });
        break;
    default:
        console.log("using Dev DB");
        db = mongoose.connect(databaseConfig.dev);
        port = portsConfig.api.dev;
        mongoSeed.clear("localhost", 27017, "local-dev", function (err) {
            mongoSeed.load("localhost", 27017, "local-dev", seedPath, "dir", function (err) {
                if (err) {
                    console.log('error seeding db: ' + err)
                }
            });
        });
        break;
}

console.log(port);
var server = app.listen(port, function () {
    var ui = new UI();
    ui.createUI();
    logger = ui.getLogger();
    new socketServer(logger);
    logger.Info('API listening on port ' + port);
    logger.Info('Connected to DB ' + db.connections[0].name);
    console.log('App listening on port ' + port);
    console.log('Conencted to DB ' + db.connections[0].name);

});

app.use(bodyParser.urlencoded({ extended: false })); // parses urlencoded bodies
app.use(bodyParser.json()); //send JSON responses
app.use(logger('dev'));
app.use(cors());
app.options('*', cors());
router(app);