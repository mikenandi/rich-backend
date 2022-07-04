// Module imports.
const path = require("path"); // 👉 FOR getting path of the file.
const fs = require("fs"); // 👉 For entering OS FILE SYSTEM.
const jsonwebtoken = require("jsonwebtoken"); // 👉 For creating token.

module.exports = {
  friendlyName: "Login",

  description: "Login users.",

  inputs: {
    email: {
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
      description: "succesfully loggin",
    },
    failure: {
      statusCode: 401,
      description: "failure",
    },
    emailNotFound: {
      statusCode: 401,
      description: "email not found.",
    },
    passwordMismatch: {
      statusCode: 400,
      description: "wrong password",
    },
  },

  fn: async function (inputs, exits) {
    try {
      // Finding the user in our database.
      let user = await User.findOne({ where: { email: inputs.email } });

      // When the user is not found in the database.
      if (!user)
        return exits.failure({
          success: false,
          code: "username_not_found",
          message: "username was not found.",
        });

      // Comparing passwords btn entered password password from database.
      await sails.helpers.passwords.checkPassword(
        inputs.password,
        user.password
      );

      // Getting private key.
      const pathToKey = path.resolve("secrets/priv_key.pem");
      const PRIV_KEY = fs.readFileSync(pathToKey, "utf8");

      // Creating payload.
      let payload = {
        sub: user.id,
        iat: Date.now(),
      };

      // Signing new token to user.
      let signedToken = jsonwebtoken.sign(payload, PRIV_KEY, {
        algorithm: "RS256",
        expiresIn: "1d",
      });

      // Response for succesfull signup.
      return exits.success({
        success: true,
        message: "successfull login",
        data: {
          user_id: user.id,
          auth_token: "Bearer " + signedToken,
        },
      });
    } catch (error) {
      // catching when user entered a wrong password
      if (error.code === "incorrect") {
        return exits.passwordMismatch({
          success: false,
          code: "wrong_password",
          message: "wrong password",
        });
      }

      // catching any other failure on login.
      return exits.failure({
        success: false,
        code: error.code,
        message: error.message,
      });
    }
  },
};
