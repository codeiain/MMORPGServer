/**
@class character
@module character
*/

var Character = require('../models/character');

/**
 * Description
 * @method save
 * @param {} req
 * @param {} res
 * @param {} next
 * @return 
 */
exports.save = function(req, res, next) {
    var playerId = req.body.playerId;
    var name = req.body.name;
    var Str = req.body.Str;
    var Dex = req.body.Dex;
    var Con = req.body.Con;
    var Int = req.body.Int;
    var Wis = req.body.Wis;
    var Cha = req.body.Cha;
    var Inventory = req.body.Inventory;



    /**
     * Description
     * @method setCharacterInto
     * @param {} request
     * @return ObjectExpression
     */
    function setCharacterInto(request) {
        return {
            _id: request._is
        };
    }

    Character.findOne({ name: name }, function(err, existingCharacter) {

        if (existingCharacter) {
            return res.status(422).send({ error: 'That character name is taken' });
        }

        var newCharacter = new Character({
            playerId: playerId,
            name: name,
            Str: Str,
            Dex: Dex,
            Con: Con,
            Int: Int,
            Wis: Wis,
            Cha: Cha,
            Inventory: Inventory
        });

        newCharacter.save(function(err, character) {
            if (err) {
                return next(err);
            }
            var characterId = setCharacterInto(character);
            res.status(201).json({
                characterId: characterId
            });
        });
    });


};

/**
 * Description
 * @method getCharactersForUser
 * @param {} req
 * @param {} res
 * @param {} next
 * @return 
 */
exports.getCharactersForUser = function(req, res, next) {
    var playerId = req.body.playerId;

    if (!playerId) {
        return res.status(422).send({ error: 'No Characters found.' });
    }

    Character.find({ playerId: playerId }, function(err, characters) {
        res.status(200).json({
            characters: characters
        })
    })
}