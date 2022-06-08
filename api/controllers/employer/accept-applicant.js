module.exports = {
  friendlyName: "Accept applicant",

  description: "Accept application from maid.",

  inputs: {
    application_id: {
      type: "string",
      required: true,
      description: "the identity of the application.",
    },
  },

  exits: {
    failure: {
      statusCode: 400,
      description: "failed update.",
    },
    success: {
      statusCode: 200,
      description: "successfull update.",
    },
  },

  fn: async function (inputs, exits) {
    try {
      let update_application = await Application.updateOne({
        where: { id: inputs.application_id, status: "call-for-interview" },
      }).set({ status: "accepted" });

      if (!update_application) {
        // for when nothing was updated
        return exits.success({
          success: false,
          code: "nothing_to_update",
          message: "nothing was updated",
        });
      }

      let update_job = await Job.updateOne({
        where: { id: update_application.job_id },
      }).set({ job_status: "not_available" });

      return exits.success({
        success: true,
        message: "successfull accepted application.",
      });
    } catch (error) {
      // catching any error
      return exits.failure({
        success: false,
        code: error.code,
        message: error.message,
      });
    }
  },
};
