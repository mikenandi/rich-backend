const crypto = require("crypto");
module.exports = {
    friendlyName: "Generate id",

    description:
        "Helper function that will help to generate unique string which will be used as id",

    inputs: {
        identity: {
            type: "string",
            required: true,
            description: "starting code which identify that unique id.",
        },
    },

    exits: {
        success: {
            description: "All done.",
        },
    },

    fn: async function (inputs, exits) {
        const generateRandomNumber = (min, max) => {
            // min and max included
            return Math.floor(Math.random() * (max - min + 1) + min);
        };

        // creating random rumber
        let generatedRandomNumber = generateRandomNumber(8, 64);

        //Generating random string with number generated.
        let number = 8;
        const random_string = crypto
            .randomBytes(generatedRandomNumber)
            .toString("base64")
            .replace(/[/\+=]/g, "");

        // combinging every thing
        let id = inputs.identity + "_" + random_string;

        // return response which will be string.
        return exits.success(id);
    },
};
