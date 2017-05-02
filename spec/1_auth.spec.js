var request = require("request");

var CharacterController = require('../app/controllers/authentication');
var CoreServer = require("../server");

var base_url = "http://localhost:9002/api/auth"

describe("Auth API Tests", function() {
    it("Post /register returns status code 201", function() {

        var user = {
            email: "testemail1@test.com",
            password: "testpassword"
        }

        request.post({
            headers: { 'content-type': 'application/json' },
            url: base_url + "/register",
            body: JSON.stringify(user)
        }, function(error, response, body) {
            expect(response.statusCode).toBe(201);
        });

    });
    it("Post /login return status code 200", function() {
        var user = {
            email: "testemail1@test.com",
            password: "testpassword"
        }

        request.post({
            headers: { 'content-type': 'application/json' },
            url: base_url + "/login",
            body: JSON.stringify(user)
        }, function(error, response, body) {
            expect(response.statusCode).toBe(200);
        })
    })
});