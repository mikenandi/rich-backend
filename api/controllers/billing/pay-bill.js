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
      let user = await User.findOne({ where: { id: inputs.user_id } }).populate(
        "payer"
      );

      let payer_id_record = user.payer[0].id;

      if (!user)
        return exits.failure({ success: false, message: "invalid payer." });

      // checking if paid amount if greater than the sum of all bills.
      let check_total = await Bill.sum("amount").where({
        payer_id: payer_id_record,
      });

      if (check_total === 0)
        return exits.failure({
          success: false,
          code: "no_unpaid_bill",
          message: "no bill is unpaid",
        });

      if (inputs.amount > check_total)
        return exits.failure({
          success: false,
          code: "greater_than_bill_total",
          message: "greater paid amount than what you are supposed to pay.",
        });

      // checking bills first
      let bill_record = await Bill.find({
        where: { payer_id: payer_id_record },
      });

      // 🎲 setting paid amount.
      let paid_amount = inputs.amount;

      // processing bill payments.
      for (let bill of bill_record) {
        if (bill.status === "unpaid" && paid_amount === bill.amount) {
          let remained_bill = bill.amount - paid_amount;
          let paid_amount_value = bill.paid_amount + paid_amount;

          await Bill.update({ id: bill.id }).set({
            amount: remained_bill,
            paid_amount: paid_amount_value,
            status: "paid",
          });

          break;
        }

        if (bill.status === "unpaid" && paid_amount > bill.amount) {
          paid_amount = paid_amount - bill.amount;

          await Bill.update({ id: bill.id }).set({
            amount: 0,
            paid_amount: bill.amount,
            status: "paid",
          });

          continue;
        }

        if (bill.amount > paid_amount && bill.status === "unpaid") {
          let remained_bill = bill.amount - paid_amount;
          let paid_amount_value = bill.paid_amount + paid_amount;

          await Bill.update({ id: bill.id }).set({
            amount: remained_bill,
            paid_amount: paid_amount_value,
            status: "unpaid",
          });

          break;
        }
      }

      let total_bill = await Bill.sum("amount").where({
        payer_id: payer_id_record,
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
