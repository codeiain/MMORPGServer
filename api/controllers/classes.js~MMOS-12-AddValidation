var classes = require('../models/classes'); 
/**
@class classes
@module api

*/


/**
 * Gets all the classes
 * @method getAll
 * @param {any} req 
 * @param {any} res 
 * @param {any} next 
 */
exports.getAll = function(req, res, next){

    classes.find({}, function(err,classes){
        if (err){
            console.log(err);
        }
        res.status(200).json({
            classes:classes
        })
    })
}

/**
 * Get class by name
 * @method getbyName
 * @param {any} req 
 * @param {any} res 
 * @param {any} next 
 */
exports.getbyName = function(req,res,next){
    classes.find({name: req.body.name}, function (err, classes){
        res.status(200).json({
            classes:classes
        })
    })
}