module.exports = {
  friendlyName: "Interview applicant",

  description: "Call for interview an applicant.",

  inputs: {
    application_id: {
      type: "string",
      required: true,
      description: "id of employer user.",
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
      // updating job where the status is pending.
      let update = await Application.updateOne({
        where: { id: inputs.application_id, status: "pending" },
      }).set({ status: "call-for-interview" });

      // response when nothing was updated
      if (!update) {
        return exits.failure({
          success: false,
          code: "nothing_to_update",
          message: "nothing to update",
        });
      }

      // return for the data.
      return exits.success({
        success: true,
        message: "successfull update",
      });
    } catch (error) {
      // 👌 catching up any error
      return exits.failure({
        success: false,
        code: error.code,
        message: error.message,
      });
    }
  },
};
