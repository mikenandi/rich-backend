module.exports = {
    friendlyName: "Create guest",

    description: "model for registering guests.",

    inputs: {
        fullname: {
            type: "string",
            required: true,
        },
        email: {
            type: "string",
            required: true,
        },
        eventId: {
            type: "string",
            required: true,
        },
    },

    exits: {
        success: {
            statusCode: 201,
            description: "created",
        },
        failure: {
            statusCode: 400,
            description: "not created",
        },
    },

    fn: async function (inputs, exits) {
        try {
            // generating id
            let id = await sails.helpers.generateId.with({ identity: "gst" });

            let guest_data = {
                id: id,
                fullname: inputs.fullname,
                email: inputs.email,
            };

            let saved_guest = await Guest.create(guest_data).fetch();

            await Event.addToCollection(inputs.eventId, "guest").members([
                saved_guest.id,
            ]);

            return exits.success({
                success: true,
                message: "created",
            });
        } catch (error) {
            // catching any other error.
            return exits.failure({
                success: false,
                code: error.code.toLowerCase(),
                message: error.message,
            });
        }
    },
};
