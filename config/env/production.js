/**
 * Production environment settings
 * (sails.config.*)
 *
 * What you see below is a quick outline of the built-in settings you need
 * to configure your Sails app for production.  The configuration in this file
 * is only used in your production environment, i.e. when you lift your app using:
 *
 * ```
 * NODE_ENV=production node app
 * ```
 *
 * > If you're using git as a version control solution for your Sails app,
 * > this file WILL BE COMMITTED to your repository by default, unless you add
 * > it to your .gitignore file.  If your repository will be publicly viewable,
 * > don't add private/sensitive data (like API secrets / db passwords) to this file!
 *
 * For more best practices and tips, see:
 * https://sailsjs.com/docs/concepts/deployment
 */

module.exports = {
  datastores: {
    default: {
      url: "postgres://gdzkollrlgbujp:2f42e6c77daa866d205569890779fbcdc41ac9a93e1457f8515196128b3d8f01@ec2-34-231-221-151.compute-1.amazonaws.com:5432/d3fs0qj9n2clkm",
      ssl: {
        rejectUnauthorized: false,
      },
    },
  },

  models: {
    migrate: "safe",
    cascadeOnDestroy: false,
  },

  blueprints: {
    shortcuts: false,
  },

  security: {
    cors: {
      // allRoutes: true,
      // allowOrigins: "*",
      // allowCredentials: false,
    },
  },

  session: {
    cookie: {
      // secure: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  },

  sockets: {
    onlyAllowOrigins: ["https://example.com", "https://staging.example.com"],
  },

  log: {
    level: "debug",
  },

  http: {
    cache: 365.25 * 24 * 60 * 60 * 1000, // One year
  },

  custom: {
    baseUrl: "https://example.com",
    internalEmailAddress: "support@example.com",
  },
};
