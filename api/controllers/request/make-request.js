module.exports = {
  friendlyName: "Make request",

  description: "user trash  bin is near full request.",

  inputs: {
    user_id: {
      type: "string",
      required: true,
      description: "the identy of the user.",
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
      let payer_record = await User.findOne({
        where: { id: inputs.user_id },
      }).populate("payer");
      let payer_id_record = payer_record.payer[0].id;
      let location_id_record = payer_record.payer[0].location_id;

      // generating unique ids.
      let gen_id = await sails.helpers.generateId.with({ identity: "rq" });

      // creating request in the database.
      await Request.create({
        id: gen_id,
        payer_id: payer_id_record,
        street_id: location_id_record,
      });

      return exits.success({
        success: true,
        message: "Request was received.",
      });
    } catch (error) {
      // 🆘 response for failed request.
      // catching any other error.
      return exits.failure({
        success: false,
        message: error.message,
      });
    }
  },
};
