module.exports = {
  friendlyName: "Create note",

  description: "creating new note.",

  inputs: {
    subject: {
      type: "string",
      required: true,
    },
    content: {
      type: "string",
      required: true,
    },
    eventId: {
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
      description: "not-created",
    },
  },

  fn: async function (inputs, exits) {
    try {
      // getting all messages that were sent to the person
      let id = await sails.helpers.generateId.with({ identity: "nt" });

      let noteData = {
        id: id,
        subject: inputs.subject,
        content: inputs.content,
      };

      let savedNote = await Note.create(noteData).fetch();

      // adding to collection
      await Event.addToCollection(inputs.eventId, "note").members([
        savedNote.id,
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
