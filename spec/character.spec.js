var request = require("request");

var CharacterController = require('../app/controllers/character');
var CoreServer = require("../server");

var base_url = "http://localhost:9001/api/characters"


describe("Character Tests", function() {

    describe("DB Tests", function() {

        it("test1", function() {
            expect(true).toBe(true);
        });
    });

    describe("API Tests", function() {
        describe("Post /getPlayerCharacters", function() {
            it("returns status code 200", function(done) {
                request.post(base_url + "/getPlayerCharacters", function(error, response, body) {
                    expect(response.statusCode).toBe(200);
                    done();
                });
            });

            describe("Post /createCharacter", function() {
                it("return status code 200", function(done) {
                    request.post(base_url + "/createCharacter", function(error, response, body) {
                        expect(response.statusCode).toBe(200);
                        done();
                    })
                })
            })

        });
    });


});