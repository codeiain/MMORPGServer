

/**
 * 
 * 
 */
module.exports = class socketServer {


    /**
     * Creates an instance of socketServer.
     * @constructor
     * @class socketServer
     * @description Manages ingame socket menthods
     * @module socket
     * @memberof socketServer
     * @param {any} config 
     * @param {any} ui 
     * @param {any} logger 
     */
    constructor(config, ui, logger) {
        var _self = this;
        let express = require('express');
        let app = express();
        this.config = config;
        this.server = require('http').createServer(app)
        this.io = require('socket.io').listen(this.server)
        this.ui = ui;
        this.activeUsers = 0;
        this.logger = logger;
        _self.port = _self.config.socket;

        this.ui.setActiveUsers(this.activeUsers);
        this.server.listen(_self.port, () => {
            _self.logger.Info("Socket listening on port " + _self.port);
        });

        _self.io.on('connection', (socket) => {
            var ip = socket.handshake.address;
            if (ip != '::1') {
                _self.getUserLocation(ip);
            }
            _self.activeUsers++;
            _self.ui.setActiveUsers(activeUsers);
            _self.socket.on('disconnect', function () {
                _self.activeUsers--;
                _self.ui.setActiveUsers(_self.activeUsers);
            })

            _self.socket.on('characterUpdated', (character) => { 
                characterUpdated(character)
            });
        })

    }

    /**
     * sends changes to characters to all other players
     * @method characterUpdated
     * @memberof socketServer
     * @param {any} character 
     */
    characterUpdated(character){

    }


    /**
     * gets the user location based on there ip and creates a new map marker
     * 
     * @method getUserLocation
     * @memberof socketServer
     * @param {any} ip 
     */
    getUserLocation(ip) {
        let http = require('http');
        return http.get({
            host: 'ipinfo.io',
            path: '/' + ip + '/json'
        }, function (response) {
            // Continuously update stream with data
            var body = '';
            response.on('data', function (d) {
                body += d;
            });
            response.on('end', function () {

                // Data reception is done, do whatever with it!
                var parsed = JSON.parse(body);
                // var lon, lat;
                // lon = parsed.loc.spit(',')[0];
                // lat = parsed.loc.spit(',')[1];
                // setMapMarker(lon, lat);
            });
        });
        //https://ipinfo.io/8.8.8.8/json
    }
}