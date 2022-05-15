module.exports = {
  friendlyName: "Location Register.",

  description: "Action that will enable user to register location.",

  inputs: {
    region: {
      type: "string",
      required: true,
      example: "Dar es salaam",
    },
    district: {
      type: "string",
      required: true,
      example: "Kinondoni",
    },
    ward: {
      type: "string",
      requried: true,
      example: "Sinza",
    },
    street: {
      type: "string",
      required: true,
      example: "Sinza A",
    },
  },

  exits: {
    failure: {
      statusCode: 400,
      description: "location creation failed.",
    },
    success: {
      statusCode: 201,
      description: "location was created.",
    },
  },

  fn: async function (inputs, exits) {
    try {
      // --creating location object.
      let location = {
        region: inputs.region,
        district: inputs.district,
        ward: inputs.ward,
        street: inputs.street,
      };

      // --creating street in database.
      await Location.create(location);

      // --response for successful response.
      return exits.success({
        success: true,
        message: "location been registered.",
      });
    } catch (error) {
      if (error.code === "E_UNIQUE") {
        // --if there is that  error means that location street has
        // --already been registered.
        console.log(error.message);
        return exits.failure({
          success: false,
          message: "street has already registered.",
        });
      }
      // --Catching any other error.
      return exits.failure({
        success: false,
        message: error.message,
      });
    }
  },
};
