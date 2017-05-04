var Race = require('../models/race');

/**
 * Description
 * @method getAll
 * @param {} req
 * @param {} res
 * @param {} next
 * @return 
 */
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

/**
 * Description
 * @method getByType
 * @param {} req
 * @param {} res
 * @param {} next
 * @return 
 */
exports.getByType = function(req, res, next) {
    Race.find({ type: req.body.type }, function(err, races) {
        res.status(200).json({
            races: races
        })
    })

}