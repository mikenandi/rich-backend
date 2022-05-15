// --module imports.
const path = require("path"); // ::FOR getting path of the file.
const fs = require("fs"); // ::For entering OS FILE SYSTEM.
const jsonwebtoken = require("jsonwebtoken"); // ::For creating token.

module.exports = {
  friendlyName: "Login",

  description: "Login users.",

  inputs: {
    email: {
      type: "string",
      required: true,
      isEmail: true,
      example: "mike12@gmail.com",
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
    emailNotFound: {
      statusCode: 401,
      description: "email entered was not found.",
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
      // --finding the user in our database.
      let user = await User.findOne({ where: { email: inputs.email } });

      // --when the user is not found in the database.
      if (!user) return exits.redirect("/signup");

      // --comparing passwords btn entered password password from database.
      await sails.helpers.passwords
        .checkPassword(inputs.password, user.password)
        .intercept("incorrect", (err) => {
          // --response when user entered wrong password.
          return exits.passwordMismatch({
            success: false,
            message: "wrong password.",
          });
        });

      // --getting private key.
      const pathToKey = path.resolve("secrets/priv_key.pem");
      const PRIV_KEY = fs.readFileSync(pathToKey, "utf8");

      // --creating payload.
      let payload = {
        sub: user.id,
        iat: Date.now(),
      };

      // --signing new token to user.
      let signedToken = jsonwebtoken.sign(payload, PRIV_KEY, {
        algorithm: "RS256",
        expiresIn: "1d",
      });

      // --response for succesfull signup.
      return exits.success({
        success: true,
        message: "successfull login",
        data: {
          token: "Bearer " + signedToken,
        },
      });
    } catch (error) {
      // --any other failure on login.
      return exits.failure({ success: false, message: error.message });
    }
  },
};
