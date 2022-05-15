/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: "users",
  attributes: {
    email: {
      type: "string",
      required: true,
      isEmail: true,
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
      required: false,
      unique: false,
      description: "role of the user.",
    },
  },
};
