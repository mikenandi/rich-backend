/**
 * Custom configuration
 * (sails.config.custom)
 *
 * One-off settings specific to your application.
 *
 * For more information on custom configuration, visit:
 * https://sailsjs.com/config/custom
 */

module.exports.custom = {
  /***************************************************************************
   *                                                                          *
   * Any other custom config this Sails app should use during development.    *
   *                                                                          *
   ***************************************************************************/
  // sendgridSecret: 'SG.fake.3e0Bn0qSQVnwb1E4qNPz9JZP5vLZYqjh7sn8S93oSHU',
  // stripeSecret: 'sk_test_Zzd814nldl91104qor5911gjald',
  // …

  // … MailGun Credentials.
  mailgunApiKey: "634f082fbfa0ca5054fc5491c272a62f-53ce4923-5d1312be",
  mailgunDomain: "https://api.eu.mailgun.net/v3/gudsurvey.ml/messages",
  fromEmail: "gudsurvey@gmail.com",
  fromName: "Richard Technologies.",

  // … Twillio credentials.
  accountSid: "ACacd0bffc9345cdf889e09d7157a9a7aa",
  authToken: "ccfe761a489db2e437deaa35d4c53cd9",
  fromNumber: "+19705338909",
  toNumber1: "+255788801486",
  toNumber: "+255747872930",
};
