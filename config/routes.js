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
  "POST /api/v1/register": { action: "auth/signup" },
  "POST /api/v1/login": { action: "auth/login" },
  "GET /api/v1/profile": { action: "user/profile" },
  "POST /api/v1/post-job": { action: "employer/post-job" },
  "GET /api/v1/posted-jobs": { action: "employer/posted-jobs" },
  "POST /api/v1/apply-job": { action: "maid/apply-jobs" },
  "GET /api/v1/applications": { action: "employer/applications" },
  "PUT /api/v1/call-for-interview": { action: "employer/interview-applicant" },
  "PUT /api/v1/accept-applicant": { action: "employer/accept-applicant" },
  "GET /api/v1/application-statuses": { action: "maid/application-status" },
};
