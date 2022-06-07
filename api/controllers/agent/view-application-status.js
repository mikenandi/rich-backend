module.exports = {


  friendlyName: 'View application status',


  description: 'Display "Application status" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/agent/application-status'
    }

  },


  fn: async function () {

    // Respond with view.
    return {};

  }


};
