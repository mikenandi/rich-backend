/**
 * Request.js
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
    payer_id: {
      type: "string",
      required: true,
    },
    street_id: {
      type: "string",
      required: true,
    },
  },
};
