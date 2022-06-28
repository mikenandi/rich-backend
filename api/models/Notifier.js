/**
 * Notifier.js
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
    notification_token: {
      type: "string",
      required: true,
    },
    user_id: {
      model: "user",
      unique: true,
    },
  },
};
