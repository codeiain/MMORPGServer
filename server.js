var express = require('express');
var app = express();
var mongoose = require('mongoose');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');

var databaseConfig = require('./config/database');
var router = require('./app/routes');

mongoose.connect(databaseConfig.url);

app.listen(9001);
console.log('App listening on port 9001');

app.use(bodyParser.urlencoded({ extended: false})); // parses urlencoded bodies
app.use(bodyParser.json()); //send JSON responses
app.use(logger('dev'));
app.use(cors());
app.options('*', cors());
router(app);

