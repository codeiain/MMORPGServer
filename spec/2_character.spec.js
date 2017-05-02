var request = require("request");

var CharacterController = require('../app/controllers/character');
var CoreServer = require("../server");
var base_url = "http://localhost:9001/api/characters"

describe("Character API Tests", function() {

    it("Post /getPlayerCharacters returns status code 200", function() {
        var user = {
            email: "testemail1@test.com",
            password: "testpassword"
        }

        request.post({
            headers: { 'content-type': 'application/json' },
            url: "http://localhost:9001/api/auth/login",
            body: JSON.stringify(user)
        }, function(error, response, body) {
            expect(response.statusCode).toBe(200);
            var data = JSON.parse(body);
            request.post({
                headers: {
                    'content-type': 'application/json',
                    'Authorization': data.token
                },
                url: base_url + "/getPlayerCharacters",
                body: JSON.stringify({ playerId: data.user._id })
            }, function(error, response, body) {
                expect(response.statusCode).toBe(200);
            });
        });
    });

    it("Post /createCharacter return status code 201 when creating a new character", function() {
        var user = {
            email: "testemail1@test.com",
            password: "testpassword"
        }

        request.post({
            headers: { 'content-type': 'application/json' },
            url: "http://localhost:9001/api/auth/login",
            body: JSON.stringify(user)
        }, function(error, response, body) {
            expect(response.statusCode).toBe(200);
            var data = JSON.parse(body);
            var NewCharcter = {
                name: "test Character",
                playerId: data.user._id,
                Cha: 0,
                Con: 0,
                Dex: 0,
                Int: 0,
                Str: 0,
                Wis: 0,
                Inventory: []
            }
            request.post({
                headers: {
                    'content-type': 'application/json',
                    'Authorization': data.token
                },
                url: base_url + "/createCharacter",
                body: JSON.stringify(NewCharcter)
            }, function(error, response, body) {
                expect(response.statusCode).toBe(201);
                var data = JSON.parse(body);
                expect(data.characterId).isNot(null);
                console.log(data.characterId);
            });

        });
    });
});