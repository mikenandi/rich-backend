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
  "POST /api/v1/guest/create": { action: "guest/create-guest" },
  "GET /api/v1/guest/guests": { action: "guest/guests" },
  "POST /api/v1/note/create": { action: "note/create-note" },
  "GET /api/v1/note/notes": { action: "note/notes" },
  "POST /api/v1/task/create": { action: "task/create-task" },
  "GET /api/v1/task/tasks": { action: "task/tasks" },
  "POST /api/v1/event/create": { action: "event/create" },
  "GET /api/v1/event/events": { action: "event/events" },
  "GET /api/v1/user/profile": { action: "user/profile" },
  "POST /api/v1/guest/send-invitations": { action: "guest/send-invitations" },
};
