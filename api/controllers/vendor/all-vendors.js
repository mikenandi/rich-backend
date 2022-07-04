module.exports = {
  friendlyName: "All vendors",

  description: "geting list of all vendors.",

  inputs: {},

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
      // geting all the data from our database.
      let vendorsRecords = await Vendor.find();

      return exits.success({
        success: true,
        message: "successfull query",
        data: vendorsRecords,
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
