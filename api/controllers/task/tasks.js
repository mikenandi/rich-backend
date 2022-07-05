module.exports = {
  friendlyName: "Read all task",

  description: "",

  inputs: {
    eventId: {
      type: "string",
      required: true,
    },
  },

  exits: {
    success: {
      statusCode: 200,
      description: "success",
    },
    failure: {
      statusCode: 400,
      description: "failed",
    },
  },

  fn: async function (inputs, exits) {
    try {
      // getting all messages that were sent to the person
      let taskRecords = await Task.find({
        where: { event_id: inputs.eventId },
        sort: [{ created_at: "DESC" }],
      });

      return exits.success({
        success: true,
        message: "successfull query",
        data: taskRecords,
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
