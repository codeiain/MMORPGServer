var request = require("request");

var CharacterController = require('../app/controllers/authentication');
var CoreServer = require("../server");

var base_url = "http://localhost:9001/api/auth"


describe("Auth Tests", function() {

    describe("DB Tests", function() {

        it("test1", function() {
            expect(true).toBe(true);
        });
    });

    describe("API Tests", function() {
        describe("Post /register", function() {
            it("returns status code 200", function(done) {
                request.post(base_url + "/register", function(error, response, body) {
                    expect(response.statusCode).toBe(200);
                    done();
                });
            });

            describe("Post /login", function() {
                it("return status code 200", function(done) {
                    request.post(base_url + "/login", function(error, response, body) {
                        expect(response.statusCode).toBe(200);
                        done();
                    })
                })
            })

        });
    });


});