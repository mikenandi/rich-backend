const jsonwebtoken = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");


module.exports = {
  friendlyName: "Signup",

  description: "Signup action.",

  inputs: {
    username: {
      type: "string",
      required: true,
      example:'mikejohn'
    },
    password: { type: "string" },
  },

  exits: {
    success: {
      statusCode: 201,
      description: "the user was created",
    },
    failure:{
      statusCode: 400,
      description:"the user was not created"
    }
  },

  fn: async function ({ username, password }, exits) {
    try {
      var hashedPassword = await sails.helpers.passwords.hashPassword(password);

      const user = {
        username,
        hashedPassword,
      };
      await User.create(user);

      /**
       * SINGNING TOKEN
       */
      const pathToKey = path.resolve('secrets/priv_key.pem')
      const PRIV_KEY = fs.readFileSync(pathToKey, 'utf8')

      const payload={
        sub: user._id,
        iat: Date.now()
      }
      const signToken = jsonwebtoken.sign(payload,PRIV_KEY,{
        expiresIn:'1d',
        algorithm:'RS256'
      })

      const authToken = {
        token: "Bearer "+signToken,
        expiresIn:'1d'
      }

    
      return exits.success({user, authToken});
    } catch (err) {
     if(err.code === 'E_UNIQUE')
    {
      return exits.failure({status: false,message:"password or username exists in the database"})
    }  
    }
  },
};
