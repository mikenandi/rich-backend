module.exports = {
  friendlyName: "Guests",

  description: "Guests guest.",

  inputs: {
    eventId: {
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
      // getting all data of guests.
      let guestsRecord = await Guest.find({
        where: { event_id: inputs.eventId },
      });
    } catch (error) {
      return exits.failure({
        success: false,
        code: error.code,
        message: error.message,
      });
    }
  },
};
