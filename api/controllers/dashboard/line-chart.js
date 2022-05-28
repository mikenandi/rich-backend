module.exports = {
  friendlyName: "Line chart",

  description: "Getting data for line charts.",

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
      // getting year.
      let year = new Date().toISOString().substring(0, 5);

      let jan = await Bill.sum("paid_amount").where({
        updated_at: { startsWith: year + "01" },
      });

      let feb = await Bill.sum("paid_amount").where({
        updated_at: { startsWith: year + "02" },
      });

      let mar = await Bill.sum("paid_amount").where({
        updated_at: { startsWith: year + "03" },
      });

      let apr = await Bill.sum("paid_amount").where({
        updated_at: { startsWith: year + "04" },
      });

      let may = await Bill.sum("paid_amount").where({
        updated_at: { startsWith: year + "05" },
      });

      let jun = await Bill.sum("paid_amount").where({
        updated_at: { startsWith: year + "06" },
      });

      let jly = await Bill.sum("paid_amount").where({
        updated_at: { startsWith: year + "07" },
      });

      let aug = await Bill.sum("paid_amount").where({
        updated_at: { startsWith: year + "08" },
      });
      let sep = await Bill.sum("paid_amount").where({
        updated_at: { startsWith: year + "09" },
      });

      let oct = await Bill.sum("paid_amount").where({
        updated_at: { startsWith: year + "10" },
      });
      let nov = await Bill.sum("paid_amount").where({
        updated_at: { startsWith: year + "11" },
      });

      let dec = await Bill.sum("paid_amount").where({
        updated_at: { startsWith: year + "12" },
      });

      return exits.success({
        success: true,
        message: "successfull response.",
        data: {
          jan: jan,
          feb: feb,
          mar: mar,
          apr: apr,
          may: may,
          jun: jun,
          jly: jly,
          aug: aug,
          sep: sep,
          oct: oct,
          nov: nov,
          dec: dec,
        },
      });
    } catch (error) {
      // 👨‍🦯 catching any other error.
      return exits.faulure({
        success: true,
        message: error.message,
      });
    }
  },
};
