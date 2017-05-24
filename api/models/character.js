/**
@module api
*/


var mongoose = require('mongoose');

var CharacterSchema = new mongoose.Schema({
    playerId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        unique: true,
        required: true
    },
    class: {
        type: String
    },
    level: Number,
    race: {
        type: String
    },
    gender: String,
    str: {
        type: Number,
        required: true
    },
    dex: {
        type: Number,
        required: true
    },
    con: {
        type: Number,
        required: true
    },
    int: {
        type: Number,
        required: true,
    },
    wis: {
        type: Number,
        required: true
    },
    cha: {
        type: Number,
        required: true
    },
    inventory: {
        type: Array,
        "default": []
    },
    speed: Number,
    size: String,
    ac: Number,
    touchAc: Number,
    flatfootAc: Number,
    hitPoints: Number,
    skills: [{
        name: String,
        modifer: Number,
        ranks: Number,
        abilityModifer: Number,
        miscModifer: Number,
        untrained: Boolean,
        armorPenalty: Boolean
    }],
    worn: {
        head: String,
        eyes: String,
        neck: String,
        shoulders: String,
        ring1: String,
        ring2: String,
        hands: String,
        arms: String,
        body: String,
        torso: String,
        waist: String,
        feet: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Characters', CharacterSchema);