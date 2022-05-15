/******************************************************************
 *  TASK SCHEDULER.
 *  @documentation https://github.com/ghaiklor/sails-hook-cron
 * -----------------------------------------------------------------
 */

// Importing actions modules from cotrollers.
const create_bill = require("../api/controllers/billing/create-bill");
const send_bill_sms = require("../api/controllers/billing/send-bill-sms");
const make_payment = require("../api/controllers/payment/make-payment");

module.exports.cron = {
  create_bill_every_month: {
    schedule: "5 * * * * *", // Time setting
    onTick: function () {
      create_bill.fn();
    },
    start: true,
  },
  send_bill_sms_every_month: {
    schedule: "05 01 * * * *", // Time setting
    onTick: function () {
      send_bill_sms.fn();
    },
    start: true,
  },
  make_payment_every_month: {
    schedule: "* * * * * *", // Time setting
    onTick: function () {
      make_payment.fn();
    },
    start: true,
  },
};
