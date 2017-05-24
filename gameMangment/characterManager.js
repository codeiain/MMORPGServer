"use strict";

module.exports = class characterManager {


    /**
     * Creates an instance of characterManger.
     * @class characterManager
     * @constructor
     * @module character
     * @memberof characterManager
     */
    constructor() {
        this.activeCharacters = [];
    }

    /**
     * stores the character in the array of active characters.
     * @method addCharacter
     * @param {any} socket 
     * @param {any} character 
     */
    addCharacter(socket, character) {
        this.activeCharacters.push({
            socket: socket,
            character: character
        })
    }

    /**
     * removes the character from the active characters.
     * @method removeCharacter
     * @param {any} socket 
     */
    removeCharacter(socket) {

    }

    /**
     * updates the character
     * @method updateCharacter
     * @param {any} socket 
     * @param {any} character 
     */
    updateCharacter(socket, character){

    }
}