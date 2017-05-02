var Race = require('../models/race');

exports.getAll = function(req, res, next) {

    Race.find({}, function(err, races) {
        if (err) {
            console.log(err);
        }
        res.status(200).json({
            races: races
        })
    })
}

exports.getByType = function(req, res, next) {
    Race.find({ type: req.body.type }, function(err, races) {
        res.status(200).json({
            races: races
        })
    })

}