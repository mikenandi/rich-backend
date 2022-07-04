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
  "POST /api/v1/auth/signup": { action: "auth/signup" },
  "POST /api/v1/auth/login": { action: "auth/login" },
  "POST /api/v1/vendor/register-service": { action: "vendor/register-service" },
  "GET /api/v1/vendor/all-vendors": { action: "vendor/all-vendors" },
  "POST /api/v1/message/send": { action: "message/send" },
  "GET /api/v1/message/messages": { action: "message/messages" },
};
