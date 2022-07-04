/**
 * Vendor.js
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
    },
    service: {
      type: "string",
      required: true,
    },
    first_package_price: {
      type: "string",
      required: true,
    },
    first_package_description: {
      type: "string",
      required: true,
    },
    second_package_price: {
      type: "string",
      required: true,
    },
    second_package_description: {
      type: "string",
      required: true,
    },
    phone_number: {
      type: "string",
      required: true,
    },
    bussiness_name: {
      type: "string",
      required: true,
    },
  },
};
