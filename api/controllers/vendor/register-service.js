module.exports = {
  friendlyName: "Register service",

  description: "",

  inputs: {
    userId: {
      type: "string",
      required: true,
    },
    service: {
      type: "string",
      required: true,
    },
    firstPackagePrice: {
      type: "string",
      required: true,
    },
    firstPackageDescription: {
      type: "string",
      required: true,
    },
    secondPackagePrice: {
      type: "string",
      required: true,
    },
    secondPackageDescription: {
      type: "string",
      required: true,
    },
    phoneNumber: {
      type: "string",
      required: true,
    },
    bussinessName: {
      type: "string",
      required: true,
    },
  },

  exits: {
    success: {
      statusCode: 201,
      description: "successfull created.",
    },
    failure: {
      statusCode: 400,
      description: "failure to create",
    },
  },

  fn: async function (inputs, exits) {
    try {
      // creating the id
      let id = await sails.helpers.generateId.with({ identity: "ven" });

      let vendor_data = {
        id: id,
        service: inputs.service,
        first_package_price: inputs.firstPackagePrice,
        first_package_description: inputs.firstPackageDescription,
        second_package_price: inputs.secondPackagePrice,
        second_package_description: inputs.secondPackageDescription,
        phone_number: inputs.phoneNumber,
        bussiness_name: inputs.bussinessName,
      };

      let vendor_saved = await Vendor.create(vendor_data).fetch();

      // adding to collection
      await User.addToCollection(inputs.userId, "vendor").members([
        vendor_saved.id,
      ]);

      return exits.success({
        success: false,
        message: "vendor created.",
      });
    } catch (error) {
      // Catching any other error.
      return exits.failure({
        success: false,
        code: error.code,
        message: error.message,
      });
    }
  },
};
