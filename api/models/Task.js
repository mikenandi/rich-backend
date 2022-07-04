/**
 * Task.js
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
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
      required: true,
    },
    assigned_to: {
      type: "string",
      defaultsTo: "me",
    },
    status: {
      type: "string",
      defaultsTo: "pending",
      isIn: ["pending", "done", "not-done"],
    },
    deadline: {
      type: "string",
      required: true,
    },
    event_id: {
      model: "event",
    },
  },
};
