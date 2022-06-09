const moment = require("moment");

module.exports = {
  friendlyName: "Application",

  description: "See maids who applied for job.",

  inputs: {
    user_id: {
      type: "string",
      required: true,
      description: "id of the employer user.",
    },
  },

  exits: {
    failure: {
      statusCode: 400,
      description: "failed request",
    },
    success: {
      statusCode: 200,
      description: "successfull response",
    },
  },

  fn: async function (inputs, exits) {
    try {
      // 🎣 checking jobs available
      let applications_recorded = await Job.find({
        where: { employer_id: inputs.user_id, job_status: "available" },
      }).populate("application");

      // checking if there is any jobs found first
      if (applications_recorded.length === 0) {
        // return when there is no job with that identity
        return exits.success({
          success: true,
          message: "you do not have any job posts.",
        });
      }

      if (applications_recorded[0].application.length === 0) {
        // return when there is no job with that identity
        return exits.success({
          success: true,
          message: "no application is filled.",
        });
      }

      let formated_response = [];

      for (let application of applications_recorded[0].application) {
        let applicant_data = await User.findOne({
          where: { id: application.applicant_id },
          select: [
            "id",
            "first_name",
            "last_name",
            "gender",
            "birthdate",
            "phone_number",
            "location_id",
          ],
        });

        let location = await Location.findOne({
          where: { id: applicant_data.location_id },
        });

        let age = moment(applicant_data.birthdate, "DDMMYYYY")
          .fromNow()
          .replace(" ago", "");

        formated_object = {
          id: applicant_data.id,
          application_id: application.id,
          first_name: applicant_data.first_name,
          last_name: applicant_data.last_name,
          gender: applicant_data.gender,
          age: age,
          phone_number: applicant_data.phone_number,
          region: location.region,
          district: location.district,
          ward: location.ward,
          street: location.street,
          service: applications_filtered[0].service,
        };

        formated_response.push(formated_object);

        continue;
      }

      // return for the data.
      return exits.success({
        success: true,
        message: "successfull response",
        data: formated_response,
      });
    } catch (error) {
      // 👌 lets catch any error that will happen
      return exits.failure({
        success: false,
        code: error.code,
        message: error.message,
      });
    }
  },
};
