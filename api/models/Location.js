/**
 * Location.js
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
      example: "Sinza A",
    },
    street_code: {
      type: "string",
      unique: true,
      description: "auto generated for identifying streets.",
    },
    payer: {
      collection: "payer",
      via: "location_id",
    },
  },
};
