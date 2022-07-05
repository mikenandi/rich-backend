module.exports = {
  friendlyName: "Create",

  description: "Create event.",

  inputs: {
    title: {
      type: "string",
      required: true,
    },
    location: {
      type: "string",
      required: true,
    },
    dateOfEvent: {
      type: "string",
      required: true,
    },
    userId: {
      type: "string",
      required: true,
    },
  },

  exits: {
    success: {
      statusCode: 201,
      description: "created",
    },
    failure: {
      statusCode: 400,
      description: "not created",
    },
  },

  fn: async function (inputs, exits) {
    try {
      // generating id
      let id = await sails.helpers.generateId.with({ identity: "evt" });

      let eventData = {
        id: id,
        title: inputs.title,
        location: inputs.location,
        date_of_event: inputs.dateOfEvent,
      };
      // Creating event on the database.
      let savedEvent = await Event.create(eventData).fetch();

      // saving it to their collection.
      await User.addToCollection(inputs.userId, "event").members([
        savedEvent.id,
      ]);

      return exits.success({
        success: true,
        message: "created",
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
