module.exports = {
  friendlyName: "Send Invitations",

  description: "Sending invitations to all guests in the event.",

  inputs: {
    eventId: {
      type: "string",
      required: true,
    },
  },

  exits: {
    success: {
      statusCode: 200,
      description: "successful sent",
    },
    failure: {
      statusCode: 400,
      description: "failed to send.",
    },
  },

  fn: async function (inputs, exits) {
    try {
      // getting all data of guests.
      let guestsRecord = await Guest.find({
        where: { event_id: inputs.eventId },
        sort: [{ created_at: "DESC" }],
      });

      // finding email record for event.
      let eventRecord = await Event.findOne({ where: { id: inputs.eventId } });

      for (let guest of guestsRecord) {
        // sending email helpers.
        await sails.helpers.sendEmail.with({
          sendTo: guest.email,
          subject: `Invitation to Event`,
          text: `Dear ${guest.fullname} you are invited to ${eventRecord.title} event which will be done on ${eventRecord.date_of_event} and it will be held at ${eventRecord.location}. \n \n NB: Please contact us if you will not attend the event`,
        });

        continue;
      }

      return exits.success({
        success: true,
        message: "successfull sent",
      });
    } catch (error) {
      // catching any other error.
      return exits.failure({
        success: false,
        code: error.code,
        message: error.message,
      });
    }
  },
};
