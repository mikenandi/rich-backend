// test/integration/controllers/UserController.test.js
const supertest = require("supertest");
const { expect } = require("chai");

describe("auth/signup", function () {
    describe("signup new user", function () {
        it("should return status code of 201", function (done) {
            supertest(sails.hooks.http.app)
                .post("/api/v1/auth/signup")
                .send({
                    fullname: "Michael Nandi",
                    email: "mike12og@gmail.com",
                    password: "test",
                })
                .expect(201, done);
        });
    });
});
