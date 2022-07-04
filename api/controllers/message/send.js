const sailsSockets = require("sails-hook-sockets/lib/sails.sockets");

module.exports = {
  friendlyName: "Send",

  description: "Send message.",

  inputs: {
    userId: {
      type: "string",
      required: true,
    },
    sendTo: {
      type: "string",
      required: true,
    },
    message: {
      type: "string",
      required: true,
    },
  },

  exits: {
    success: {
      statusCode: 200,
      description: "message sent",
    },
    failure: {
      statusCode: 400,
      description: "message sending failed",
    },
  },

  fn: async function (inputs, exits) {
    try {
      let id = await sails.helpers.generateId.with({ identity: "msg" });

      // saving the message
      let messageData = {
        id: id,
        message: inputs.message,
        from: inputs.userId,
        to: inputs.sendTo,
      };

      messageRecord = await Message.create(messageData).fetch();

      return exits.success({
        success: true,
        message: "sent.",
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
