module.exports = {
  friendlyName: "Create note",

  description: "creating new note.",

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
      // getting all messages that were sent to the person
      let notesRecords = await Note.find({
        where: { event_id: inputs.eventId },
      });

      return exits.success({
        success: true,
        message: "successful query",
        data: notesRecords,
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
