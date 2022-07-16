module.exports = {
    friendlyName: "Events",

    description: "Read events created.",

    inputs: {
        userId: {
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
            let eventRecords = await Event.find({
                where: { user_id: inputs.userId },
                sort: [{ created_at: "DESC" }],
            });

            return exits.success({
                success: true,
                message: "successfull query",
                data: eventRecords,
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
