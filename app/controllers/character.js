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
    var Str = req.body.str;
    var Dex = req.body.dex;
    var Con = req.body.con;
    var Int = req.body.int;
    var Wis = req.body.wis;
    var Cha = req.body.cha;
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
            str: Str,
            dex: Dex,
            con: Con,
            int: Int,
            wis: Wis,
            cha: Cha,
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

exports.validateCharacterName = function(req, res, next) {
    var Name = req.body.characterName;

    Character.find({ name: Name }, function(err, character) {
        if (err) {

        }
        if (character.length == 0) {
            res.status(200).json({
                name: character
            });
        } else {
            res.status(422).send({ error: 'Character\'s Name Exists' });
        }

    })

}