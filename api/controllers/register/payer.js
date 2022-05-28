module.exports = {
  friendlyName: "Payer",

  description: "Payer register.",

  inputs: {
    first_name: {
      type: "string",
      description: "fullname of the user.",
    },
    last_name: {
      type: "string",
      description: "fullname of the user.",
    },
    phone_no: {
      type: "string",
      required: true,
      maxLength: 16,
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
    street_code: {
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
      // console.log(inputs.type);
      // 🌍 getting location from street code.
      let location = await Location.findOne({
        where: { street_code: inputs.street_code },
      });

      // -- response when the user entered wrong street code.
      if (!location)
        return exits.failure({
          success: false,
          message: "wrong street code.",
        });

      //  👇 transforming values.
      let type;

      if (inputs.type === "normal house") type = "normal-house";

      if (inputs.type === "house with tenant") type = "house-with-tenant";

      if (inputs.type === "small business") type = "small-bussiness";

      if (inputs.type === "hotel") type = "hotel";

      // -- creating control number.
      let control_number = (Math.random() + " ").substring(2, 12);

      // 👇 Creating object for payer as user;

      // -- creating password which will be payer phone number.
      let hashedPassword = await sails.helpers.passwords.hashPassword(
        inputs.phone_no
      );

      // 👇 generating id string.
      let user_id = await sails.helpers.generateId.with({ identity: "usr" });

      // -- creating user in our database
      let user = {
        id: user_id,
        first_name: inputs.first_name,
        last_name: inputs.last_name,
        username: inputs.phone_no,
        password: hashedPassword,
        role: "payer",
      };

      let created_user = await User.create(user).fetch();

      // 🙎 Creating payer object.

      // 👉 first creating id
      let payer_id = await sails.helpers.generateId.with({ identity: "py" });

      let payer = {
        id: payer_id,
        phone_no: inputs.phone_no,
        type: type,
        house_no: inputs.house_no,
        control_number: control_number,
      };

      let created_payer = await Payer.create(payer).fetch();

      // 🔨 Creating collections
      // -- Addding user id to table payer.
      await User.addToCollection(created_user.id, "payer").members([
        created_payer.id,
      ]);

      // -- Adding location id to table payer.
      await Location.addToCollection(location.id, "payer").members([
        created_payer.id,
      ]);

      // -- Return when the response was successfull.
      return exits.success({
        success: true,
        message: "payer was created.",
      });
    } catch (error) {
      // when the record created is invalid record.
      if (error.code === "E_INVALID_NEW_RECORD") {
        await User.destroyOne({ where: { username: inputs.phone_no } });

        return exits.failure({
          success: false,
          message: "failure, no user was created.",
        });
      }

      // -- When the value entered violated unique contraint.
      if (error.code === "E_UNIQUE") {
        return exits.failure({
          success: false,
          message: "phone number already exits.",
        });
      }

      // -- Catching any error.
      return exits.failure({
        success: false,
        message: error.message,
      });
    }
  },
};
