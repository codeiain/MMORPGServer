module.exports = class api {

      /**
     * Creates an instance of rest api server
     * @constructor
     * @class api
     * @module api
     * @memberof api
     * @param {any} config 
     * @param {any} ui 
     * @param {any} logger 
     */
    constructor(config, ui, logger) {
        this.config = config;
        this.express = require('express');
        this.app = this.express();
        this.mongoose = require('mongoose');
        this.bodyParser = require('body-parser');
        this.cors = require('cors');

        this.router = require('../api/routes');
        this.authentication = require('../api/controllers/authentication');
        this.ui = ui;
        this.logger = logger;
    }

    /**
     * starts the API server
     * @module startServer
     */
    startServer() {
        var _self = this;
        _self.mongoose.connect(_self.config.database);
        var server = _self.app.listen(_self.config.api, function () {
            _self.logger.Info('API Server listening on port ' + _self.config.api);
            _self.logger.Info('Database conencted to' + _self.config.database);
        })
        _self.app.use(_self.bodyParser.urlencoded({ extended: false })); // parses urlencoded bodies
        _self.app.use(_self.bodyParser.json()); //send JSON responses
        //app.use(logger('dev'));
        _self.app.use(_self.cors());
        _self.app.options('*', _self.cors());
        _self.router(_self.app);
    }
}