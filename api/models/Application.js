/**
 * Application.js
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
    job_id: {
      model: "job",
    },
    applicant_id: {
      model: "user",
    },
    status: {
      type: "string",
      isIn: ["pending", "call-for-enterview", "accepted"],
      defaultsTo: "pending",
    },
  },
};
