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

      let jobs_with_applications = applications_recorded.filter((job_post) => {
        return job_post.application.length > 0;
      });

      if (jobs_with_applications.length === 0) {
        // return when there is no job with that identity
        return exits.success({
          success: true,
          message: "no application is filled.",
        });
      }

      let formated_response = [];
      // looping for object for every job with application
      for (let job_with_application of jobs_with_applications) {
        // looping for every application
        // 😅
        console.log(job_with_application);
        for (let application of job_with_application.application) {
          // looping to find data for every user in our object.
          // 🙋
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

          console.log(applicant_data);

          // 🌎 finding location of the person.
          let location = await Location.findOne({
            where: { id: applicant_data.location_id },
          });

          // determinging age of the person.
          let age = moment(applicant_data.birthdate, "DDMMYYYY")
            .fromNow()
            .replace(" ago", "");

          // creating object that will have format of our expected output.
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
            service: job_with_application.service,
          };

          formated_response.push(formated_object);

          continue;
        }
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
