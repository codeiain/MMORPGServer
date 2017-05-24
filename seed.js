var path = require('path');

module.exports = class seedDB {

    constructor(config, logger) {
        var _self = this;
        this.mongoSeed = require('mongo-seed');
        this.seedPath = path.resolve(__dirname + "/seed/");

        var connection = config.database.replace('mongodb://', '');
        var server = connection.split('/')[0];
        var db = connection.split('/')[1];
        this.mongoSeed.clear(server, 27017, db, (err) => {
            if (err) {
                _self.logger.Error(err);
            }
            this.mongoSeed.load(server, 27017, db, _self.seedPath, "dir", (err) => {
                if (err) {
                    _self.logger.Error(err);
                }
            })
        })

    }
}