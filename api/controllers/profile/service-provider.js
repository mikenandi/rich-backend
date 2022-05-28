module.exports = {
  friendlyName: "Service provider",

  description:
    "Action that will be responsible on fetching data of the service provider.",

  inputs: {
    user_id: {
      type: "string",
      required: true,
      description: "identity of the user.",
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
      // finding user data from users.
      let user_record = await User.findOne({
        where: { id: inputs.user_id },
      }).populate("service_provider");

      // response for successfull response.
      return exits.success({
        success: false,
        message: "successfull response",
        data: {
          first_name: user_record.first_name,
          last_name: user_record.last_name,
          username: user_record.username,
          account_number: user_record.service_provider[0].account_no,
          phone_no: user_record.service_provider[0].phone_no,
          type: user_record.service_provider[0].type,
          charge_amount: user_record.service_provider[0].charge_amount,
          company_name: user_record.service_provider[0].company_name,
          service: user_record.service_provider[0].service,
        },
      });
    } catch (error) {
      // catching any other error.
      return exits.failure({
        success: false,
        message: error.message,
      });
    }
  },
};
