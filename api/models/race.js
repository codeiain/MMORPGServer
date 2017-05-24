var mongoose = require('mongoose');

var RaceSchema = new mongoose.Schema({
        name: {
            type: "String"
        },
        type: {
            type: "String"
        },
        description: {
            type: "String"
        },
        abilityAdjustments: {
            type: [
                "Mixed"
            ]
        },
        classSkill: {
            type: [
                "Mixed"
            ]
        },
        skillBonuses: {
            type: [
                "Mixed"
            ]
        },
        languages: {
            automatic: {
                type: [
                    "Mixed"
                ]
            },
            bonus: {
                type: [
                    "Mixed"
                ]
            }
        },
        racialBonus: {
            type: [
                "Mixed"
            ]
        },
        movement: {
            type: "Number"
        },
        sight: {
            type: {
                type: "String"
            },
            distance: {
                type: "Number"
            }
        },
        raceSkills: {
            type: [
                "Mixed"
            ]
        }
    }

)

module.exports = mongoose.model('Race', RaceSchema);