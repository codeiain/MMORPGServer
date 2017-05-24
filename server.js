
var configProvider = require('./configProvider');
var UI = require('./UI/Ui.js');
var socketServer = require('./servers/socketServer');
var apiServer = require('./servers/apiServer');
var seed = require('./seed.js');


function init(env) {
    var config = new configProvider();
    config.load(env).then((configData) => {
        let ui = new UI();
        ui.createUI();
        let logger = ui.getLogger();
        logger.Info('System Starting up in '+ config.getEnv().env + ' mode');
        new seed(configData, logger);
        let api = new apiServer(configData, ui, logger);
        api.startServer();
        new socketServer(configData, ui, logger);
    })

}

init('test');