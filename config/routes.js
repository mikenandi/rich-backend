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
  // -- ROUTES FOR AUTHENTICATION.
  "POST /api/v1/register": { action: "auth/signup" },
  "POST /api/v1/login": { action: "auth/login" },

  // -- REGISTER
  "POST /api/v1/register-location": { action: "register/location" },
  "POST /api/v1/register-payer": { action: "register/payer" },
  "POST /api/v1/register-service-provider": {
    action: "register/service-provider",
  },
  "POST /api/v1/make-request": { action: "request/make-request" },

  // -- 🛒 GET REQUESTS.
  "GET /api/v1/search-location": { action: "search/region" },
  "GET /api/v1/user-profile": { action: "profile/profile" },
  "GET /api/v1/header-summary": { action: "dashboard/header-count" },
  "GET /api/v1/payer-profile": { action: "profile/payer" },
  "GET /api/v1/line-chart-data": { action: "dashboard/line-chart" },
  "GET /api/v1/total-user-bill": { action: "dashboard/total-bill" },
  "GET /api/v1/total-requests": { action: "dashboard/taka-quest" },
  "GET /api/v1/search-unpaid-bills": { action: "search/unpaid-bills-query" },
  "GET /api/v1/service-provider-profile": {
    action: "profile/service-provider",
  },

  // -- PUT REQUEST.
  "PUT /api/v1/pay-bill": { action: "billing/pay-bill" },
};
