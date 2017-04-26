var Character = require('../models/character');

exports.save = function (req, res, next) {

    var playerId = req.body.playerId;
    var name = req.body.name;
    var Str = req.body.str;
    var Dex = req.body.dex;
    var Con = req.body.con;
    var Int = req.body.int;
    var Wis = req.body.wis;
    var Cha = req.body.cha;
    var Inventory = req.body.inventory;

    var character = new Character({
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

    function setCharacterInto(request) {
        return {
            _id: request._is
        };
    }

    character.save(function (err, character) {
        if (err) {
            return next(err);
        }
        var characterId = setCharacterInto(character);
        res.status(201).json({
            characterId: characterId
        });
    });

}