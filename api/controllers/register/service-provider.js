module.exports = {
  friendlyName: "Service provider",

  description:
    "Action to register a person who is providing sevices for example cleaning trucks and security guards.",

  inputs: {
    name: {
      type: "string",
      required: true,
      example: "Firstname Lastname",
    },
    phone_no: {
      type: "string",
      required: true,
      example: "0620574280",
    },
    type: {
      type: "string",
      required: true,
      description:
        "type of service provider whether is an individual or company.",
    },
    account_no: {
      type: "string",
      required: true,
      maxLength: 50,
      example: "1234899859998",
    },
    charge_amount: {
      type: "number",
      required: true,
    },
    service: {
      type: "string",
      required: true,
    },
  },

  exits: {
    failure: {
      statusCode: 400,
      description: "failed to created service provider.",
    },
    success: {
      statusCode: 201,
      description: "service privider created.",
    },
  },

  fn: async function (inputs, exits) {
    try {
      // --creating service provider object
      let service_provider = {
        name: inputs.name,
        phone_no: inputs.phone_no,
        account_no: inputs.account_no,
        charge_amount: inputs.charge_amount,
        service: inputs.service,
        type: inputs.type,
      };
      // --Now creating that provider to our DB.
      let created_service_provider = await Service_provider.create(
        service_provider
      );

      // --response for successfull response.
      return exits.success({
        success: true,
        message: "service provider was created.",
      });
    } catch (error) {
      // --checking if unique contraint is not broken.
      if (error.code === "E_UNIQUE") {
        return exits.failure({
          success: false,
          message: "your phone  number or account number is not unique.",
        });
      }
      // --catch error
      return exits.failure({
        success: false,
        message: error.message,
      });
    }
  },
};
