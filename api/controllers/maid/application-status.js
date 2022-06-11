module.exports = {
  friendlyName: "Application status",

  description: "See progress on application.",

  inputs: {
    user_id: {
      type: "string",
      required: true,
      description: "id of user maid",
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
      // checking it in the database.
      let application_status = await Application.find({
        where: { applicant_id: inputs.user_id },
      });

      let formated_output = [];

      for (let application of application_status) {
        // checking the job first
        let job = await Job.findOne({ where: { id: application.job_id } });

        // checking if job is un_available will move to next iteration.
        if (job.job_status === "un_available") continue;

        // Finding user data.
        let employer = await User.findOne({
          where: { id: job.employer_id },
          select: [
            "first_name",
            "last_name",
            "gender",
            "phone_number",
            "location_id",
          ],
        });

        // Finding location of the employer.
        let location = await Location.findOne({
          where: { id: employer.location_id },
        });

        // making an object that will be returned to the user.
        let formated_object = {
          id: application.id,
          job_title: job.service,
          employer: employer.first_name + " " + employer.last_name,
          phone_number: employer.phone_number,
          location: location.region + ", " + location.ward,
          salary: job.salary,
          type: job.job_type,
          status: application.status,
        };

        // adding the formated object to our formated output
        formated_output.push(formated_object);

        continue;
      }

      // return for successfull response.
      return exits.success({
        success: true,
        message: "successfull response.",
        data: formated_output,
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
