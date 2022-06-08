module.exports = {
  friendlyName: "Posted jobs",

  description: "Get all Posted jobs page.",

  inputs: {
    user_id: {
      type: "string",
      required: true,
      description: "id of the employer",
    },
  },

  exits: {
    failure: {
      statusCode: 400,
      description: "failed request.",
    },
    success: {
      statusCode: 200,
      description: "successfull request.",
    },
  },

  fn: async function (inputs, exits) {
    try {
      // 🎣 checking jobs available
      let jobs_recorded = await Job.find({
        where: { employer_id: inputs.user_id, job_status: "available" },
      });

      // checking if there is any jobs found first
      if (jobs_recorded.length === 0) {
        // return when there is no job with that identity
        return exits.success({
          success: true,
          message: "you did not post any job",
        });
      }

      // return for the data.
      return exits.success({
        success: true,
        message: "successfull response",
        data: jobs_recorded,
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
