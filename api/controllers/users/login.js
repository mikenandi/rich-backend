const path = require("path");
const fs = require("fs");
const jsonwebtoken = require("jsonwebtoken");

module.exports = {
  friendlyName: "Login",

  description: "Login users.",

  inputs: {
    username: {
      type: "string",
      required: true,
    },
    password: {
      type: "string",
      required: true,
    },
  },

  exits: {
    success: {
      statusCode: 200,
      description: "user was succesfully logged in",
    },
    failure: {
      statusCode: 401,
      description: "user was not authorized",
    },
    passwordMismatch: {
      statusCode: 400,
      description: "the user entered the wrong password",
    },
    redirect: {
      statusCode: 302,
      description: "redirected to register route",
    },
  },

  fn: async function (inputs, exits) {
    try {
      var user = await User.findOne({ where: { username: inputs.username } });
      if (!user) return exits.redirect("/signup");

      await sails.helpers.passwords
        .checkPassword(inputs.password, user.hashedPassword)
        .intercept("incorrect", (err) => {
          return exits.passwordMismatch({
            message: "you entered the wrong password",
          });
        });

      /**
       * issue jwt
       */

      const pathToKey = path.resolve("secrets/priv_key.pem");
      const PRIV_KEY = fs.readFileSync(pathToKey, "utf8");
      //console.log(user.id);
      const payload = {
        sub: user.id,
        iat: Date.now(),
      };
      console.log(payload);
      const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, {
        algorithm: "RS256",
        expiresIn: "1d",
      });
      return exits.success({
        token: "Bearer " + signedToken,
        expiresIn: "1d",
      });
    } catch (err) {
      console.log(err.message);
    }
  },
};
