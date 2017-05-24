/**
 * This is a comment.
 */

this.mongoSeed = require('mongo-seed');


// function fred() {

//     var db = undefined;

//     var port = undefined;
//     var seedPath = path.resolve(__dirname + "/seed/");




//     var pm = new portManager('api', function (portToUse) {
//         port = portToUse;
//         switch (process.env.NODE_ENV) {
//             case 'dev':
//                 console.log("using Dev DB");
//                 db = mongoose.connect(databaseConfig.dev);
//                 mongoSeed.load("localhost", 27017, "local-dev", seedPath, "dir", function (err) {
//                     if (err) {
//                         console.log('error seeding db: ' + err)
//                     }
//                 });
//                 break;
//             case 'test':
//                 console.log("using Test DB");
//                 db = mongoose.connect(databaseConfig.test);
//                 mongoSeed.clear("localhost", 27017, "local-test", function (err) {
//                     console.log('cleared db');
//                     mongoSeed.load("localhost", 27017, "local-test", seedPath, "dir", function (err) {
//                         if (err) {
//                             console.log('error seeding db: ' + err)
//                         } else {
//                             console.log('seeded DB');
//                         }
//                     });
//                 });
//                 break;
//             default:
//                 console.log("using Dev DB");
//                 db = mongoose.connect(databaseConfig.dev);
//                 mongoSeed.clear("localhost", 27017, "local-dev", function (err) {
//                     mongoSeed.load("localhost", 27017, "local-dev", seedPath, "dir", function (err) {
//                         if (err) {
//                             console.log('error seeding db: ' + err)
//                         }
//                     });
//                 });
//                 break;
//         }

//     })
// }


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