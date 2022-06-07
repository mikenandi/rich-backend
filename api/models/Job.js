/**
 * Job.js
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
    service: {
      type: "string",
      required: true,
    },
    job_type: {
      type: "string",
      isIn: ["full-time", "part-time"],
      required: true,
    },
    salary: {
      type: "number",
    },
    gender_preference: {
      type: "string",
      defaultsTo: "any-gender",
      isIn: ["male", "female", "any-gender"],
    },
    description: {
      type: "string",
      defaultsTo: "no descriptions",
    },
    job_status: {
      type: "string",
      isIn: ["available", "not_available"],
      defaultsTo: "available",
    },
    employer_id: {
      model: "user",
    },
    application: {
      collection: "application",
      via: "job_id",
    },
  },
};
