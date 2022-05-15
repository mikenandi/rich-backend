/**
 * Datastores
 *
 */

module.exports.datastores = {
  default: {
    // --setting postgresql database
    // --for case of mysql set the adapter to be sails-mysql
    // --change adapter name to 'sails-myql'
    // --change url to :
    // --url: "mysql://username:DB_password@localhost:3306/DB_NAME"
    adapter: "sails-postgresql",
    url: "postgresql://postgres:love&*tech0145@localhost:5432/bundala_project",
  },
};
