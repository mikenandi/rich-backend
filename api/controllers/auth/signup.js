// --Module imports.
const jsonwebtoken = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

module.exports = {
  friendlyName: "Signup",

  description: "Signup action.",

  inputs: {
    first_name: {
      type: "string",
      example: "michael",
    },
    last_name: {
      type: "string",
      example: "nandi",
    },
    email: {
      type: "string",
      required: true,
      isEmail: true,
      example: "mikejohn@gmail.com",
    },
    password: { type: "string", required: true },
    phone_number: {
      type: "string",
      required: true,
    },
    gender: {
      type: "string",
      required: true,
    },
    birthdate: { type: "string", required: true },
    region: {
      type: "string",
      required: true,
    },
    district: {
      type: "string",
      required: true,
    },
    ward: {
      type: "string",
      required: true,
    },
    street: {
      type: "string",
      required: true,
    },
    role: {
      type: "string",
      required: true,
    },
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
    // Global variables.
    let created_location;
    try {
      // -- 👌 registering location first
      // generate its id first.
      let generated_location_id = await sails.helpers.generateId.with({
        identity: "lc",
      });

      let location_data = {
        id: generated_location_id,
        region: inputs.region,
        district: inputs.district,
        ward: inputs.ward,
        street: inputs.street,
      };

      created_location = await Location.create(location_data).fetch();

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
        first_name: inputs.first_name,
        last_name: inputs.last_name,
        email: inputs.email,
        phone_number: inputs.phone_number,
        password: hashedPassword,
        role: inputs.role,
        birthdate: inputs.birthdate,
        gender: inputs.gender,
      };

      let created_user = await User.create(user).fetch();

      // making their collection
      await Location.addToCollection(created_location.id, "user").members([
        created_user.id,
      ]);

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
        await Location.destroyOne({ where: { id: created_location.id } });

        return exits.failure({
          success: false,
          message: "Email or phone number already exists",
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
