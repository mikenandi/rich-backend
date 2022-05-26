module.exports = {
  friendlyName: "Pay bill",

  description: "End point that will act as our prototype for payment.",

  inputs: {
    user_id: {
      type: "string",
      required: true,
    },
    amount: {
      type: "number",
      required: true,
      description: "amount that user is paying",
    },
  },

  exits: {
    failure: {
      statusCode: 400,
      description: "failed payment.",
    },
    success: {
      statusCode: 200,
      description: "successfull payment.",
    },
  },

  fn: async function (inputs, exits) {
    try {
      // creating variable for paid amount.
      let paid_amount = inputs.amount;

      // checking if paid amount if greater than the sum of all bills.
      let check_total = await Bill.sum("amount").where({
        payer_id: inputs.user_id,
      });

      if (check_total === 0)
        exits.failure({
          success: false,
          message: "no bill is unpaid",
        });

      if (paid_amount > check_total)
        return exits.failure({
          success: false,
          message: "greater paid amount.",
        });

      // checking bills first
      let bill_record = await Bill.find({
        where: { payer_id: inputs.user_id },
      });

      for (let bill of bill_record) {
        if (bill.status === "unpaid" && paid_amount > bill.amount) {
          paid_amount = paid_amount - bill.amount;
          console.log("here first.");
          await Bill.update({ id: bill.id }).set({
            amount: 0,
            status: "paid",
          });
        }

        if (bill.amount > paid_amount && bill.status === "unpaid") {
          console.log("second one");
          let remained_bill = bill.amount - paid_amount;
          paid_amount = 0;
          console.log("here second");
          await Bill.update({ id: bill.id }).set({
            amount: remained_bill,
          });

          if (paid_amount === 0) break;
        }
      }

      let total_bill = await Bill.sum("amount").where({
        payer_id: inputs.user_id,
      });

      return exits.success({
        success: true,
        message: "successfull payment",
        data: {
          bill_now: total_bill,
        },
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
