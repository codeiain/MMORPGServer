var mongoose = require('mongoose');

var ClassesSchema = new mongoose.Schema({

    name:{
        type:"String",
        index: true,
        required:true
    },
    description:{
        type:"String"
    },
    hitDie:{
        type:"String"
    },
    classSkills:[],
    skillPointBase:{
        value:"Number",
        statModifier:"String",
        mutiplyer:"Number"
    },
    skillPointsPerLevel:{
        value:"Number",
        statModifier:"String"
    },
    levels:[{
        level:"Number",
        baseAttackBonus:[],
        fortSave:"Number",
        refSave:"Number",
        willSave:"Number",
        special:[]
    }]
});

module.exports = mongoose.model('Classes', ClassesSchema);