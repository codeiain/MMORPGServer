var express = require('express');
var app = express();
var mongoose = require('mongoose');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');

var mongodb = require('mongodb'),
    MongoClient = mongodb.MongoClient;

var databaseConfig = require('./config/database');
var router = require('./app/routes');
var db = undefined;
switch (process.env.NODE_ENV) {
    case 'dev':
        console.log("using Dev DB");
        db = mongoose.connect(databaseConfig.dev);
        break;
    case 'test':
        console.log("using Test DB");
        db = mongoose.connect(databaseConfig.test);
        break;
    default:
        console.log("using Dev DB");
        db = mongoose.connect(databaseConfig.dev);
        break;
}


var server = app.listen(9001, function() {

    console.log('App listening on port 9001');
    console.log('Conencted to DB ' + db.connections[0].name);
});

app.use(bodyParser.urlencoded({ extended: false })); // parses urlencoded bodies
app.use(bodyParser.json()); //send JSON responses
app.use(logger('dev'));
app.use(cors());
app.options('*', cors());
router(app);