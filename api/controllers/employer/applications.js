module.exports = {
  friendlyName: "Application",

  description: "See maids who applied for job.",

  inputs: {
    user_id: {
      type: "string",
      required: true,
      description: "id of the employer user.",
    },
  },

  exits: {
    faillure: {
      statusCode: 400,
      description: "failed request",
    },
    success: {
      statusCode: 200,
      description: "successfull response",
    },
  },

  fn: async function (inputs, exits) {
    try {
      // 🎣 checking jobs available
      let applications_recorded = await Job.find({
        where: { employer_id: inputs.user_id, job_status: "available" },
      }).populate("application");

      // checking if there is any jobs found first
      if (applications_recorded.length === 0) {
        // return when there is no job with that identity
        return exits.success({
          success: true,
          message: "no application is filled.",
        });
      }

      let applications_filtered = applications_recorded.filter(
        (application) => {
          return application.application.length > 0;
        }
      );

      // return for the data.
      return exits.success({
        success: true,
        message: "successfull response",
        data: applications_filtered,
      });
    } catch (error) {
      // 👌 lets catch any error that will happen
      return exits.failure({
        success: false,
        code: error.code,
        message: error.message,
      });
    }
  },
};
