var request = require("request");
var path = require('path');
var RaceController = require('../api/controllers/race');
var CoreServer = require("../server");

var base_url = "http://localhost:9002/api/races";

describe("Race API Tests", function() {

    it("Post /getAllRaces", function() {
        var user = {
            email: "testemail1@test.com",
            password: "testpassword"
        }

        request.post({
            headers: { 'content-type': 'application/json' },
            url: "http://localhost:9002/api/auth/login",
            body: JSON.stringify(user)
        }, function(error, response, body) {
            expect(response.statusCode).toBe(200);
            var data = JSON.parse(body);
            request.post({
                headers: {
                    'content-type': 'application/json',
                    'Authorization': data.token
                },
                url: base_url + "/getAllRaces"
            }, function(error, response, body) {
                var data = JSON.parse(body);
                console.log(data);
                console.log(body);
                //expect(response.statusCode).toBe(200);
                expect(data.races.lenght).toBe(19);
                expect(false).toBe(true);
            });
        });
    })



})