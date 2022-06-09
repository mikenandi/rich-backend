module.exports = {
  friendlyName: "Register maid",

  description: "Maid registered by maid.",

  inputs: {
    user_id: {
      type: "string",
      required: true,
      description: "agent id",
    },
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
    phone_number: {
      type: "string",
      required: true,
    },
    gender: {
      type: "string",
      required: true,
    },
    birthdate: {
      type: "string",
      required: true,
    },
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
      // checking if user is agent
      let isAgent = await User.findOne({
        where: { id: inputs.user_id, role: "agent" },
      });

      // Reponse when the user is not agent.
      if (!isAgent) {
        return exits.failure({
          success: false,
          code: "not_authorized",
          message: "you should have agent acount to perform this operation.",
        });
      }

      //  👌 Registering location first
      // Generate its id first.
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

      // Hashing password.
      let hashedPassword = await sails.helpers.passwords.hashPassword("123456");

      // Generating id.
      let generated_user_id = await sails.helpers.generateId.with({
        identity: "usr",
      });

      // Creating variable user.
      let user = {
        id: generated_user_id,
        first_name: inputs.first_name,
        last_name: inputs.last_name,
        email: inputs.email,
        phone_number: inputs.phone_number,
        password: hashedPassword,
        role: "maid-by-agent",
        birthdate: inputs.birthdate,
        gender: inputs.gender,
      };

      let created_user = await User.create(user).fetch();

      // Making their collection
      await Location.addToCollection(created_location.id, "user").members([
        created_user.id,
      ]);

      // Response when user was successfull created.
      return exits.success({
        success: true,
        message: "maid registered.",
      });
    } catch (error) {
      // When there is a person with that email already created.
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
