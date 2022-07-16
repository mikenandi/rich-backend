// Imports of userful modules of sending email.
const nodemailer = require("nodemailer");
const mailgun = require("nodemailer-mailgun-transport");

module.exports = {
    friendlyName: "Send email",

    description:
        "Helper function for sending email using mailgun and nodemailer. ",

    inputs: {
        sendTo: {
            type: "string",
            isEmail: true,
            required: true,
            description: "Email of the person receiving recovery link.",
        },
        subject: {
            type: "string",
            required: true,
            description: "Subject of email. ",
        },
        text: {
            type: "string",
            required: true,
            description: "Message that needs to be delivered of email. ",
        },
    },

    exits: {
        failure: {
            description: "Error occured. ",
        },
        success: {
            description: "Email was sent.",
        },
    },

    fn: async function (inputs, exits) {
        // Authentication details.
        let mailgunAuth = {
            auth: {
                api_key: sails.config.custom.mailgunApiKey,
                domain: sails.config.custom.mailgunDomain,
            },
        };

        let nodemailerMailgun = nodemailer.createTransport(
            mailgun(mailgunAuth)
        );

        // Sending email.
        nodemailerMailgun.sendMail(
            {
                from: `Evento <${sails.config.custom.fromEmail}>`,
                headers: sails.config.custom.fromName,
                to: inputs.sendTo,
                subject: inputs.subject,
                text: inputs.text,
            },
            (error, response) => {
                // Checking if there was error during sending email.
                if (error) {
                    console.log(error);
                    return exits.failure();
                }

                // Response for successfull email sent
                return exits.success();
            }
        );
    },
};
