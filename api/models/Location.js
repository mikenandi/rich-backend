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
      description: "unique identifier of the data",
    },
    region: {
      type: "string",
      required: true,
    },
    district: {
      type: "string",
      required: true,
    },
    ward: {
      type: "string",
      required: true,
    },
    street: {
      type: "string",
      required: true,
    },
    user: {
      collection: "user",
      via: "location_id",
    },
  },
};
