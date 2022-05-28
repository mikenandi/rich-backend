module.exports = {
  friendlyName: "Total bill",

  description: "Action to get total payer bill.",

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
      descriiption: "failed request.",
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

      // finding sum of all unpaid bill.
      let total_bill = await Bill.sum("amount").where({
        payer_id: payer_id_record,
        status: "unpaid",
      });

      // response for successfull response.
      return exits.success({
        success: true,
        message: "successful response.",
        data: {
          total_bill: total_bill,
        },
      });
    } catch (error) {
      return exits.failure({ success: false, message: error.message });
    }
  },
};
