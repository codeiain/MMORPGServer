var express = require('express')
    , app = express()
    , server = require('http').createServer(app)
    , sio = require('socket.io').listen(server)
var portsConfig = require('./config/ports')
var logger;
var port;

module.exports = class socketServer {


    constructor(logger) {
        logger = logger
        switch (process.env.NODE_ENV) {
            case 'dev':
                port = portsConfig.socket.dev;
                break;
            case 'test':
                port = portsConfig.socket.test;
                break;
            case 'uat':
                port = portsConfig.socket.uat;
                break;
            default:
                port = portsConfig.socket.dev;
                break;
        }
        console.log(port);
        server.listen(port, function () {
            logger.Info("Socket listening on port " + port);
        });
    }
}