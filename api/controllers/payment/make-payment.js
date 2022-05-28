module.exports = {
  friendlyName: "Make payment",

  description:
    "Action that  will be running automatically every end of the month to pay service providers.",

  fn: async function () {
    try {
      let service_provider_record = await Service_provider.find();

      for (let data of service_provider_record) {
        // 👌 generating random id for payment.
        let payment_id = await sails.helpers.generateId.with({
          identity: "pyt",
        });

        // making payment for every user
        await Payment.create({
          id: payment_id,
          amount: data.charge_amount,
          service_provider_id: data.id,
        });
      }

      console.log(
        "successfull payments made to providers at::",
        new Date().toString()
      );
      return;
    } catch (error) {
      console.log(error.message);
    }
  },
};
