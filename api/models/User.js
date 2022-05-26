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
    email: {
      type: "string",
      isEmail: true,
      description: "email of the user this will be used as username.",
    },
    username: {
      type: "string",
      required: true,
      unique: true,
      description: "email of the user this will be used as username.",
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
    role: {
      type: "string",
      required: true,
      isIn: ["admin", "payer", "service_provider"],
      unique: false,
      description: "role of the user.",
    },
    payer: {
      collection: "payer",
      via: "user_id",
    },
    service_provider: {
      collection: "service_provider",
      via: "user_id",
    },
  },
};
