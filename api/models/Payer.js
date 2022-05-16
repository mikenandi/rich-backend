/**
 * Payers.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    // ::PRIMITIVES
    first_name: {
      type: "string",
      required: true,
      description: "first name of the user.",
    },
    last_name: {
      type: "string",
      required: true,
      description: "last name of the user.",
    },
    phone_no: {
      type: "string",
      maxLength: 10,
      required: true,
      description: "phone number of person",
    },
    house_no: {
      type: "string",
      required: true,
      description:
        "payer work which will determine amount which he/she will be charged.",
    },
    type: {
      type: "string",
      required: true,
      isIn: ["normal-house", "house-with-tenant", "small-bussiness", "hotel"],
      description: "number of the house where the person is residing.",
    },
    control_number: {
      type: "string",
      required: true,
      unique: true,
      maxLength: 16,
      description: "control number for person to pay the bill.",
    },
    // ::ASSOCIATIONS
    location_id: {
      model: "location",
    },
    bill: {
      collection: "bill",
      via: "payer_id",
    },
  },
};
