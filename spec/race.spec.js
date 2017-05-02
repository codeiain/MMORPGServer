var request = require("request");

var RaceController = require('../app/controllers/race');
var CoreServer = require("../server");

var base_url = "http://localhost:9001/api/races"


describe("Race Tests", function() {

    describe("DB Tests", function() {

        it("test1", function() {
            expect(true).toBe(true);
        });
    });

    describe("API Tests", function() {
        describe("Post /getAllRacess", function() {
            it("returns status code 200", function(done) {
                request.post(base_url + "/getAllRaces", function(error, response, body) {
                    expect(response.statusCode).toBe(200);
                    done();
                });
            });

            describe("Post /getByType", function() {
                it("return status code 200", function(done) {
                    request.post(base_url + "/getByType", function(error, response, body) {
                        expect(response.statusCode).toBe(200);
                        done();
                    })
                })
            })

        });
    });


});