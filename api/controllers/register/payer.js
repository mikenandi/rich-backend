module.exports = {
  friendlyName: "Payer",

  description: "Payer register.",

  inputs: {
    first_name: {
      type: "string",
      unique: true,
      description: "fullname of the user.",
    },
    last_name: {
      type: "string",
      unique: true,
      description: "fullname of the user.",
    },
    phone_no: {
      type: "string",
      required: true,
      maxLength: 10,
      unique: true,
      description: "phone number of person",
    },
    type: {
      type: "string",
      required: true,
      description:
        "payer work which will determine amount which he/she will be charged.",
    },
    house_no: {
      type: "string",
      required: true,
      description: "number of the house where the person is residing.",
    },
    region: {
      type: "string",
      required: true,
    },
    distict: {
      type: "string",
      required: true,
    },
    ward: {
      type: "string",
      required: true,
    },
    street: {
      type: "string",
      required: true,
    },
  },

  exits: {
    failure: {
      statusCode: 400,
      description: "payer registration failed.",
    },
    success: {
      statusCode: 201,
      description: "payer registration successfull.",
    },
  },

  fn: async function (inputs, exits) {
    try {
      console.log(inputs);
      // transforming values.
      //  isIn: ["normal-house", "house-with-tenant", "small-bussiness", "hotel"],
      let type;
      if (inputs.type === "normal house") {
        type = "normal-house";
      }

      if (inputs.type === "house with tenant") {
        type = "house-with-tenant";
      }

      if (inputs.type === "small bussiness") {
        type = "small-bussiness";
      }

      if (inputs.type === "hotel") {
        type = "hotel";
      }
      // --creating control number.
      let control_number =
        (Math.random() + " ").substring(2, 10) +
        (Math.random() + " ").substring(2, 10);

      // registering location from user
      let location = await Location.create({
        region: inputs.region,
        district: inputs.distric,
        ward: inputs.ward,
        street: inputs.street,
      }).fetch();

      // --creating object for payer
      let payer = {
        first_name: inputs.first_name,
        last_name: inputs.last_name,
        phone_no: inputs.phone_no,
        type: type,
        house_no: inputs.house_no,
        control_number: control_number,
      };

      let created_payer = await Payer.create(payer).fetch();

      await Location.addToCollection(location.id, "payer").members([
        created_payer.id,
      ]);

      return exits.success({
        success: true,
        message: "payer was created.",
      });
    } catch (error) {
      console.log(error.message);
      if (error.code === "E_UNIQUE") {
        return exits.failure({
          success: false,
          message: "phone number already exits.",
        });
      }
      // --Catching any error.
      return exits.failure({
        success: false,
        message: error.message,
      });
    }
  },
};
