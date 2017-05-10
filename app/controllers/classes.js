var classes = require('../models/classes'); 

exports.getAll = function(req, res, next){

    classes.find({}, function(err,classes){
        if (err){
            console.log(err);
        }
        res.status(200),json({
            classes:classes
        })
    })
}

exports.getbyName = function(req,res,next){
    classes.find({name: req.body.name}, function (err, classes){
        res.status(200).json({
            classes:classes
        })
    })
}