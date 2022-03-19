module.exports = {
  friendlyName: "Protected",

  description: "Protected home.",

  inputs: {},

  exits: {
    success: {
      statusCode: 200,
      description: "protected route",
    },
  },

  fn: async function (inputs, exits) {
    return exits.success({ msg: "the user was able to login secured root" });
  },
};
