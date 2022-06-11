const moment = require("moment");

module.exports = {
  friendlyName: "Applicants to interview",

  description:
    "Action that checks applicants that will need to be interviewed.",

  inputs: {
    user_id: {
      type: "string",
      required: true,
      description: "identity of employer.",
    },
  },

  exits: {
    failure: {
      statusCode: 400,
      description: "failed request.",
    },
    success: {
      statusCode: 200,
      description: "successfull response.",
    },
  },

  fn: async function (inputs, exits) {
    try {
      // finding all jobs first.
      let applicaton_with_enterview = await Job.find({
        where: { employer_id: inputs.user_id, job_status: "available" },
      }).populate("application");

      // filtering to get job application array are not empty.
      let jobs_with_application = applicaton_with_enterview.filter((job) => {
        return job.application.length > 0;
      });

      let formated_output = [];

      // looping to our data to extract values.
      for (let job of jobs_with_application) {
        for (let application of job.application) {
          // doing no thing, just jumpt to next iteration.
          if (
            application.status === "pending" ||
            application.status === "accepted" ||
            application.status === "not-accepted"
          )
            continue;

          // getting applicant data.
          let applicant_data = await User.findOne({
            where: { id: application.applicant_id },
            select: [
              "first_name",
              "last_name",
              "gender",
              "birthdate",
              "phone_number",
            ],
          });

          // determinging age of the person.
          let age = moment(applicant_data.birthdate, "DDMMYYYY")
            .fromNow()
            .replace(" ago", "");

          // formating object.
          let formated_object = {
            id: application.id,
            applicant_name:
              applicant_data.first_name + " " + applicant_data.last_name,
            service: job.service,
            phone_number: applicant_data.phone_number,
            age: age,
            gender: applicant_data.gender,
          };

          // Adding data to our array.
          formated_output.push(formated_object);

          continue;
        }
      }

      // Response for successfull request.
      return exits.success({
        success: true,
        message: "successfull response",
        data: formated_output,
      });
    } catch (error) {
      // catch any other error
      return exits.failure({
        success: false,
        code: error.code,
        message: error.message,
      });
    }
  },
};
