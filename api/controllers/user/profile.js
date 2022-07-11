module.exports = {
  friendlyName: "Profile",

  description: "Profile of user.",

  inputs: {
    userId: {
      type: "string",
      required: true,
    },
  },

  exits: {
    success: {
      statusCode: 200,
      description: "successful query",
    },
    failure: {
      statusCode: 400,
      description: "failed query",
    },
  },

  fn: async function (inputs, exits) {
    try {
      // finding users from the database.
      let userRecord = await User.findOne({ where: { id: inputs.userId } });

      // Response for successfull response.
      return exits.success({
        success: true,
        message: "successful response",
        data: userRecord,
      });
    } catch (error) {
      // catching any other error.
      return exits.failure({
        success: false,
        code: error.code,
        message: error.message,
      });
    }
  },
};
