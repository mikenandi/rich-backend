// test/integration/controllers/UserController.test.js
const supertest = require("supertest");
const expect = require("chai").expect;

describe("auth/signup", function () {
  describe("login()", function () {
    it("should redirect provide token, and user id", function (done) {
      supertest(sails.hooks.http.app)
        .post("/auth/signup")
        .send({
          fullname: "Michael Nandi",
          email: "mike12og@gmail.com",
          password: "test",
        })
        .expect(200, done);
    });
  });
});
