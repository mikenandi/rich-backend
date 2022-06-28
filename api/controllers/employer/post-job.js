const axios = require("axios");

module.exports = {
  friendlyName: "New job",

  description: "Posting new job.",

  inputs: {
    user_id: {
      type: "string",
      required: true,
    },
    service: {
      type: "string",
      required: true,
    },
    job_type: {
      type: "string",
      required: true,
    },
    salary: {
      type: "string",
      required: true,
    },
    gender_preference: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
    },
  },

  exits: {
    success: {
      statusCode: 201,
      description: "successfully created",
    },
    failure: {
      statusCode: 400,
      description: "not created",
    },
  },

  fn: async function (inputs, exits) {
    try {
      // first checkig if the user is employer
      let isEmployer = await User.findOne({
        where: { id: inputs.user_id, role: "employer" },
      });

      if (!isEmployer) {
        return exits.failure({
          success: false,
          code: "un_authorized",
          message: "only employer can post job",
        });
      }
      // generating id.
      let generated_id = await sails.helpers.generateId.with({
        identity: "jb",
      });

      // creating with description.
      let job_data_with_description = {
        id: generated_id,
        service: inputs.service,
        job_type: inputs.job_type,
        salary: inputs.salary,
        gender_preference: inputs.gender_preference,
        description: inputs.description,
      };

      // creating with out description.
      let job_data_without_description = {
        id: generated_id,
        service: inputs.service,
        job_type: inputs.job_type,
        salary: inputs.salary,
        gender_preference: inputs.gender_preference,
      };

      // creating the data in the DB.
      let created_job;
      if (inputs.description) {
        created_job = await Job.create(job_data_with_description).fetch();
      } else {
        created_job = await Job.create(job_data_without_description).fetch();
      }

      // Adding to collection.
      await User.addToCollection(inputs.user_id, "job").members([
        created_job.id,
      ]);

      let people_to_notify = await Notifier.find();

      for (let person of people_to_notify) {
        // sending token to clients
        await axios({
          method: "POST",
          url: "https://exp.host/--/api/v2/push/send",
          headers: {
            // Accept: "application/json",
            // "Accept-encoding": "gzip, deflate",
            // "Content-Type": "application/json",
          },
          data: JSON.stringify({
            to: person.notification_token,
            sound: "default",
            title: "Smart Maids.",
            body: "New jobs have been posted, please check out!",
            data: { someData: "goes here" },
          }),
        });

        continue;
      }

      return exits.success({
        success: true,
        message: "successfully created.",
      });
    } catch (error) {
      // catching any error
      return exits.failure({
        success: false,
        code: error.code,
        message: error.message,
      });
    }
  },
};
