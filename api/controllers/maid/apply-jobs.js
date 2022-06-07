module.exports = {
  friendlyName: "Apply",

  description: "Apply maid jobs.",

  inputs: {
    user_id: {
      type: "string",
      required: true,
    },
    job_id: {
      type: "string",
      required: true,
    },
  },

  exits: {
    failure: {
      statusCode: 400,
      description: "not created.",
    },
    success: {
      statusCode: 201,
      description: "successfull created.",
    },
  },

  fn: async function (inputs, exits) {
    try {
      let existing_application = await Application.findOne({
        where: { applicant_id: inputs.user_id, job_id: inputs.job_id },
      });

      // when application was found.
      if (existing_application) {
        // response when the record was found
        return exits.failure({
          success: false,
          code: "already_applied",
          message: "you have already applied for this maid job.",
        });
      }
      // generating id first
      let genereted_id = await sails.helpers.generateId.with({
        identity: "app",
      });

      // saving id before adding data from other tables
      let created_application = await Application.create({
        id: genereted_id,
      }).fetch();

      // adding applicant id
      await User.addToCollection(inputs.user_id, "application").members([
        created_application.id,
      ]);

      // adding job_id
      await Job.addToCollection(inputs.job_id, "application").members([
        created_application.id,
      ]);

      return exits.success({
        success: true,
        message: "successfully applied.",
      });

      // All done.
    } catch (error) {
      // 👌 catching any other error.
      return exits.failure({
        success: false,
        code: error.code,
        message: error.message,
      });
    }
  },
};
