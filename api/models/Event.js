/**
 * Event.js
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
        location: {
            type: "string",
            required: true,
        },
        date_of_event: {
            type: "string",
            required: true,
        },
        user_id: {
            model: "user",
        },
        guest: {
            collection: "guest",
            via: "event_id",
        },
        note: {
            collection: "note",
            via: "event_id",
        },
        task: {
            collection: "task",
            via: "event_id",
        },
    },
};
