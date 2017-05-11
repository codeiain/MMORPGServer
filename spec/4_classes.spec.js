var request = require("request");
var ClassesController = require('../app/controllers/classes');
var CoreServer = require('../server');

var base_url = "http://localhost:9002/api/classes";

describe("Class API Tests", function () {
    it("Post /getAll return status code 200", function () {
        var user = {
            email: "testemail1@test.com",
            password: "testpassword"
        }

        request.post({
            headers: { 'content-type': 'applciation/json' },
            url: "http://localhost:9002/api/auth/login",
            body: JSON.stringify(user)
        }, function (error, response, body) {
            expect(response.statusCode).toBe(200);
            var data = JSON.parse(body);
            request.post({
                headers: {
                    'content-type': 'application/json', 'Authorization': data.token
                },
                url: base_url + "/getAll"
            }, function(error, response, body){
                expect(response.statusCode).toBe(200);
            })
    })
})
}) 