/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: "users",
  primaryKey: "id",
  attributes: {
    id: {
      type: "string",
      required: true,
    },
    first_name: {
      type: "string",
      unique: false,
      description: "fullname of the user.",
    },
    last_name: {
      type: "string",
      unique: false,
      description: "fullname of the user.",
    },
    password: {
      type: "string",
      required: true,
      description: "hashed password of the user.",
    },
    gender: {
      type: "string",
      required: true,
      isIn: ["male", "female"],
      description: "showing gender or a user.",
    },
    role: {
      type: "string",
      required: true,
      isIn: ["maid", "employer", "agent", "maid-created-by-agent"],
      unique: false,
      description: "role of the user.",
    },
    birthdate: {
      type: "string",
      required: true,
    },
    email: {
      type: "string",
      unique: true,
      description: "fullname of the user.",
    },
    phone_number: {
      type: "string",
      unique: true,
    },
    location_id: {
      model: "location",
    },
    job: {
      collection: "job",
      via: "employer_id",
    },
    application: {
      collection: "application",
      via: "applicant_id",
    },
  },
};
