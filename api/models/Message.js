/**
 * Message.js
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
    message: {
      type: "string",
      required: true,
    },
    from_user_id: {
      type: "string",
      required: true,
    },
    to_user_id: {
      type: "string",
      required: true,
    },
    status: {
      type: "string",
      defaultsTo: "unread",
      isIn: ["read", "unread"],
    },
  },
};
