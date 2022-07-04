// --Module imports.
const jsonwebtoken = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

module.exports = {
  friendlyName: "Signup",

  description: "Signup action.",

  inputs: {
    fullname: {
      type: "string",
      example: "michael",
    },

    email: {
      type: "string",
      required: true,
      isEmail: true,
      example: "mikejohn@gmail.com",
    },
    password: { type: "string", required: true },
  },

  exits: {
    success: {
      statusCode: 201,
      description: "user created",
    },
    failure: {
      statusCode: 400,
      description: "user not created",
    },
  },

  fn: async function (inputs, exits) {
    try {
      // --hashing password.
      let hashedPassword = await sails.helpers.passwords.hashPassword(
        inputs.password
      );

      // --generating id.
      let generated_user_id = await sails.helpers.generateId.with({
        identity: "usr",
      });

      // --creating variable user.
      let user = {
        id: generated_user_id,
        fullname: inputs.first_name,
        email: inputs.email,
        password: hashedPassword,
      };

      let created_user = await User.create(user).fetch();

      // --getting private key.
      const pathToKey = path.resolve("secrets/priv_key.pem");
      const PRIV_KEY = fs.readFileSync(pathToKey, "utf8");

      // --creating payload.
      let payload = {
        sub: created_user.id,
        iat: Date.now(),
      };

      // --signing token.
      let signToken = jsonwebtoken.sign(payload, PRIV_KEY, {
        expiresIn: "1d",
        algorithm: "RS256",
      });

      // --creating token with bearer word.
      let authToken = {
        token: "Bearer " + signToken,
      };

      // --response when user was successfull created.
      return exits.success({
        success: true,
        message: "user created",
        data: {
          user_id: created_user.id,
          role: created_user.role,
          auth_token: authToken.token,
        },
      });
    } catch (error) {
      // --when there is a person with that email already created.
      if (error.code === "E_UNIQUE") {
        return exits.failure({
          success: false,
          message: "Email already exists",
        });
      }

      // Catching any other errors
      return exits.failure({
        success: false,
        code: error.code,
        message: error.message,
      });
    }
  },
};
