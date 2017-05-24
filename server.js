
var configProvider = require('./configProvider');
var UI = require('./UI/Ui.js');
var socketServer = require('./servers/socketServer');
var apiServer = require('./servers/apiServer');
var seed = require('./seed.js');


function init() {
    var config = new configProvider();
    config.load().then((config) => {
        let ui = new UI();
        ui.createUI();
        let logger = ui.getLogger();
        logger.Info('System Starting up');
        new seed(config, logger);
        let api = new apiServer(config, ui, logger);
        api.startServer();
        new socketServer(config, ui, logger);
    })

}

init();