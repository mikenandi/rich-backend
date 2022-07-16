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
        fullname: {
            type: "string",
            unique: false,
            description: "fullname of the user.",
        },
        password: {
            type: "string",
            required: true,
            description: "hashed password of the user.",
        },
        email: {
            type: "string",
            unique: true,
            description: "fullname of the user.",
        },
        vendor: {
            collection: "vendor",
            via: "user_id",
        },
        event: {
            collection: "event",
            via: "user_id",
        },
    },
};
