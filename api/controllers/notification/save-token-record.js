module.exports = {
  friendlyName: "Save token",

  description: "action that will be saving token from our client phone.",

  inputs: {
    notificationToken: {
      type: "string",
      required: true,
    },
    user_id: {
      type: "string",
      required: true,
    },
  },

  exits: {
    failure: {
      statusCode: 400,
      description: "notification token not saved.",
    },
    success: {
      statusCode: 201,
      description: "notification token saved",
    },
  },

  fn: async function (inputs, exits) {
    try {
      // checking if it was already saved to our database
      let saved_token = await Notifier.findOne({
        notification_token: inputs.notificationToken,
      });

      if (saved_token) {
        // if token was found we will not save it again.
        return exits.failure({
          sucsess: false,
          code: "already_exits",
        });
      }

      // creating the id.
      let id = await sails.helpers.generateId.with({ identity: "ntf" });

      let saved_notifier = await Notifier.create({
        id: id,
        notification_token: inputs.notificationToken,
      }).fetch();

      // saving up their relations.
      await User.addToCollection(inputs.user_id, "notifier").members([
        saved_notifier.id,
      ]);

      // response.
      return exits.success({
        success: true,
        message: "token was saved.",
      });
    } catch (error) {
      // Catching any other error.
      return exits.failure({
        success: false,
        code: error.code,
        message: error.message,
      });
    }
  },
};
