/**
 * Default model settings
 */

module.exports.models = {
  schema: true,

  // --making the database migration to be altered on
  // --development other option is droping all data when you refresh.
  migrate: "safe",

  attributes: {
    // -- 👋 auto created attributes for the database.
    id: { type: "number", autoIncrement: true },
    created_at: { type: "string", autoCreatedAt: true },
    updated_at: { type: "string", autoUpdatedAt: true },
  },

  dataEncryptionKeys: {
    default: "Yqi9SselRQAmwMx6bNSdR44dlqMNrPPJ7bzf30nq9Dg=",
  },

  cascadeOnDestroy: true,
};
