/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
  // --ROUTES FOR AUTHENTICATION.
  "POST /api/v1/signup": { action: "auth/signup" },
  "POST /api/v1/login": { action: "auth/login" },

  // --REGISTER
  "pOST /api/v1/register-location": { action: "register/location" },
  "POST /api/v1/register-payer": { action: "register/payer" },
  "POST /api/v1/register-service-provider": {
    action: "register/service-provider",
  },

  "GET /": { action: "home/protected" },
};
