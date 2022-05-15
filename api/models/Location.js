/**
 * Location.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    region: {
      type: "string",
      required: false,
      example: "Dar es salaam",
    },
    district: {
      type: "string",
      required: false,
      example: "Kinondoni",
    },
    ward: {
      type: "string",
      required: false,
      example: "Sinza",
    },
    street: {
      type: "string",
      required: false,
      unique: true,
      example: "Sinza A",
    },
    payer: {
      collection: "payer",
      via: "location_id",
    },
  },
};
