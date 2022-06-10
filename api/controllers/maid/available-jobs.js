module.exports = {
  friendlyName: "Available jobs",

  description:
    "Action that will enable user to see available jobs in the market.",

  inputs: {},

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
      let jobs_available = await Job.find({
        where: { job_status: "available" },
        sort: [{ salary: "DESC" }],
      });

      return exits.success({
        success: true,
        message: "successfull query.",
        data: jobs_available,
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
