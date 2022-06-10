module.exports = {
  friendlyName: "Application status",

  description: "See progress on application.",

  inputs: {
    user_id: {
      type: "string",
      required: true,
      description: "id of user maid",
    },
  },

  exits: {
    failure: {
      statusCode: 400,
      description: "failed request.",
    },
    success: {
      statusCode: 200,
      description: "successfull response.",
    },
  },

  fn: async function (inputs, exits) {
    try {
      // checking it in the database.
      let application_status = await Application.find({
        where: { applicant_id: inputs.user_id },
      });

      let status_for_available_jobs = [];

      for (let application of application_status) {
        // checking the job first

        let job = await Job.findOne({ where: { id: application.job_id } });

        // checking if job is available
        if (job.job_status === "available") {
          status_for_available_jobs.push(application);
          continue;
        }
      }

      return exits.success({
        success: true,
        message: "successfull response.",
        data: status_for_available_jobs,
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
