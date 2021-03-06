
"use strict";
var os = require("os");

    /**
    * @class UIUtils
    * @module UI
    */
module.exports = class UIUtils {



    /**
    * cpuAverage works out average cpu usage
    * @method cpuAverage
    * 
    * @returns {object}
    */
    cpuAverage() {

        //Initialise sum of idle and time of cores and fetch CPU info
        var totalIdle = 0, totalTick = 0;
        var cpus = os.cpus();

        //Loop through CPU cores
        for (var i = 0, len = cpus.length; i < len; i++) {

            //Select CPU core
            var cpu = cpus[i];

            //Total up the time in the cores tick
            for (let type in cpu.times) {
                totalTick += cpu.times[type];
            }

            //Total up the idle time of the core
            totalIdle += cpu.times.idle;
        }

        //Return the average Idle and Tick times
        return { idle: totalIdle / cpus.length, total: totalTick / cpus.length };
    }

    /**
     * return the current time
     * @method getTime
     * @return {string} yy:mm:ss
     */
    getTime() {

        var date = new Date();

        var hour = date.getHours();
        hour = (hour < 10 ? "0" : "") + hour;

        var min = date.getMinutes();
        min = (min < 10 ? "0" : "") + min;

        var sec = date.getSeconds();
        sec = (sec < 10 ? "0" : "") + sec;

        return hour + ":" + min + ":" + sec;

    }
    /**
     * returns the curretn cpu temp only works on linux
     * @method getTemp
     * @return {string} temp
     */
    getTemp() {
        var exec = require('child_process').exec;
        exec('vcgencmd measure_temp', function callback(error, stdout, stderr) {
            var currentTemp = stdout.replace('temp=', '').replace('\'C', '');
            return currentTemp;
        });
    }

}
