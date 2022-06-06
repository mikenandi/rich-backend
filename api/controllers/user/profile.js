module.exports = {
  friendlyName: "Profile",

  description: "User profile.",

  inputs: {
    user_id: {
      type: "string",
      required: true,
      description: "identity of user",
    },
  },

  exits: {
    success: {
      statusCode: 200,
      description: "successfull response.",
    },
    failure: {
      statusCode: 400,
      description: "failed response",
    },
  },

  fn: async function (inputs, exits) {
    try {
      let user_record = await User.findOne({
        where: { id: inputs.user_id },
      });

      if (!user_record) {
        // returning response when there is no record
        return exits.failure({
          success: false,
          code: "user_not_found",
          message: "user record not found",
        });
      }

      let location_record = await Location.findOne({
        where: { id: user_record.location_id },
      });

      let user_data = {
        id: user_record.id,
        first_name: user_record.first_name,
        last_name: user_record.last_name,
        gender: user_record.gender,
        role: user_record.role,
        birthdate: user_record.birthdate,
        email: user_record.email,
        phone_number: user_record.phone_number,
        ward: location_record.ward,
        region: location_record.region,
        street: location_record.street,
        district: location_record.district,
      };

      return exits.success({
        success: true,
        message: "successfull response",
        data: user_data,
      });
    } catch (error) {
      // catcing any other error
      return exits.failure({
        success: false,
        code: error.code,
        message: error.message,
      });
    }
  },
};
