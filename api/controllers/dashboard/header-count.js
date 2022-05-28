module.exports = {
  friendlyName: "Header count",

  description: "showing different counts on dashboard.",

  inputs: {},

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
      // 🕐 formating time
      let year_month = new Date().toISOString().substring(0, 7);

      // 🐙 getting data counts from our database.
      let monthly_total = await Bill.sum("paid_amount").where({
        updated_at: { startsWith: year_month },
      });

      let total_streets = await Location.count();

      let total_payers = await Payer.count();

      return exits.success({
        success: true,
        message: "successfull response",
        data: {
          streets: total_streets,
          payers: total_payers,
          monthly_collections: monthly_total,
        },
      });
    } catch (error) {
      // Catching any other error
      return exits.failure({
        success: false,
        message: error.message,
      });
    }
  },
};
