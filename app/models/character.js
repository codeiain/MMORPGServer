/**
@module character
*/


var mongoose = require('mongoose');

var CharacterSchema = new mongoose.Schema({
    playerId:{
        type:String,
        required:true
    },
    name:{
        type:String,
        unique:true,
        required:true
    },
    Str:{
        type:Number,
        required:true
    },
    Dex:{
        type:Number,
        required:true
    },
    Con:{
        type:Number,
        required:true
    },
    Int:{
        type:Number,
        required:true,
    },
    Wis:{
        type:Number,
        required:true
    },
    Cha:{
        type:Number,
        required:true
    },
    Inventory:{
        type : Array , 
        "default" : []
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Characters', CharacterSchema);