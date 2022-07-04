/**
 * Note.js
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
    subject: {
      type: "string",
      required: true,
    },
    content: {
      type: "string",
      required: true,
    },
    event_id: {
      model: "event",
    },
  },
};
