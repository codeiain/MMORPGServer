

var fs = require('fs');
module.exports = class configProvider {

    constructor() {
        this.http = require('http');
        this.env = undefined;
        this.config = undefined;
    }

    load() {
        return new Promise((resolve, reject) => {
            var _self = this;
            fs.readFile('./config/env.json', (err, data) => {
                if (err) reject(err);
                _self.env = JSON.parse(data);
                fs.readFile('./config/config.' + _self.env.env + '.json', function (err, data) {
                    if (err) reject(err);
                    _self.config = JSON.parse(data);
                    resolve(_self.config);
                })
            });
        })
    }

    getConfig(key){
        return this.config[key];
    }

    getEnv(){
        return this.env;
    }
}