const authMiddleware = require('../helpers/authMiddleware.js')
const requestTable = require('../database/tables/requests.js')
const formatDates = require('../helpers/dateHelper.js');
const errorHelper = require('../helpers/errorHelper.js');
const dateHelper = require('../helpers/dateHelper.js')

module.exports = {
  method: 'GET',
  path:'/dashboard',
  config: {
    auth: {
      strategy: 'base'
    },
    pre: [
        { method: authMiddleware, assign: 'user' }
    ],
    handler: (req, reply) => {
      if (req.pre.user.admin === true) {
        requestTable.retrieve(function (err, dashboardData) {
          if (err) {
            return reply.view('error', {
              error: errorHelper.databaseError
            });
          }
          let formattedData = formatDates.fixDate(dashboardData);
          return reply.view('dashboard', { requests: formattedData });
        });
      } else {
        return reply.view('error', {
          error : errorHelper.authenticationError
        });
      }
    }
  }
};
