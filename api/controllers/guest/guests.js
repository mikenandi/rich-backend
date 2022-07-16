module.exports = {
    friendlyName: "Guests",

    description: "Guests guest.",

    inputs: {
        eventId: {
            type: "string",
            required: true,
        },
    },

    exits: {
        success: {
            statusCode: 200,
            description: "successful query",
        },
        failure: {
            statusCode: 400,
            description: "failed query",
        },
    },

    fn: async function (inputs, exits) {
        try {
            // getting all data of guests.
            let guestsRecord = await Guest.find({
                where: { event_id: inputs.eventId },
                sort: [{ created_at: "DESC" }],
            });

            return exits.success({
                success: true,
                message: "successfull query",
                data: guestsRecord,
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
