module.exports = {
  friendlyName: "Create task",

  description: "",

  inputs: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
      required: true,
    },
    assignedTo: {
      type: "string",
      defaultsTo: "me",
    },
    deadline: {
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
      description: "not created",
    },
  },

  fn: async function (inputs, exits) {
    try {
      // getting all messages that were sent to the person
      let id = await sails.helpers.generateId.with({ identity: "tsk" });

      let taskData = {
        id: id,
        title: inputs.title,
        description: inputs.description,
        assigned_to: inputs.assignedTo,
        deadline: inputs.deadline,
      };

      let savedTask = await Task.create(taskData);

      // adding to collection
      await Event.addToCollection(inputs.eventId, "note").members([
        savedTask.id,
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
