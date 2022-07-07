module.exports = {
  friendlyName: "Messages",

  description: "Messages message.",

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
      // getting all messages that were sent to the person
      let messageRecords = await Message.find({
        where: {
          or: [
            { from_user_id: inputs.userId },
            { from_user_id: inputs.userId },
          ],
        },
      });

      return exits.success({
        success: true,
        message: "successful query",
        data: messageRecords,
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
