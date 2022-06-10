module.exports = {
  friendlyName: "Available jobs",

  description:
    "Action that will enable user to see available jobs in the market.",

  inputs: {},

  exits: {
    failure: {
      statusCode: 400,
      description: "failed request.",
    },
    success: {
      statusCode: 200,
      description: "successfull request.",
    },
  },

  fn: async function (inputs, exits) {
    try {
      // getting a list of jobs available
      let jobs_available = await Job.find({
        where: { job_status: "available" },
        sort: [{ salary: "DESC" }],
      });

      // arrary of objects with desired output
      let formated_output = [];

      // looping to find location of each job.
      for (let job of jobs_available) {
        // getting location id that relates to the job.
        let extracted_location_id = await User.findOne({
          where: { id: job.employer_id },
          select: ["location_id"],
        });

        // finding location from the extracted id
        let extracted_location = await Location.findOne({
          where: { id: extracted_location_id.location_id },
        });

        // formating output
        let formated_object = {
          ...job,
          region: extracted_location.region,
          district: extracted_location.district,
          ward: extracted_location.ward,
          street: extracted_location.street,
        };

        // adding to our formated output  list
        formated_output.push(formated_object);
      }

      // response for successfull query.
      return exits.success({
        success: true,
        message: "successfull query.",
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
