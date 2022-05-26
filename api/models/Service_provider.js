/**
 * Service_provider.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  primaryKey: "id",
  attributes: {
    id: {
      type: "string",
      required: true,
    },
    user_id: {
      model: "user",
      unique: true,
    },
    company_name: {
      type: "string",
      defaultsTo: "individual person",
      example: "company",
    },
    type: {
      type: "string",
      required: true,
      isIn: ["individual", "company"],
    },
    phone_no: {
      type: "string",
      unique: true,
      example: "0620574280",
    },
    account_no: {
      type: "string",
      unique: true,
      minLength: 10,
      maxLength: 50,
      example: "1234899859998",
    },
    charge_amount: {
      type: "number",
      required: true,
    },
    service: {
      type: "string",
      isIn: ["cleanes_truck", "security_guard"],
      required: true,
    },
  },
};
