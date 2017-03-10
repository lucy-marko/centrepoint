const authMiddleware = require('../helpers/authMiddleware.js')
const requestTable = require('../database/tables/requests.js')
const formatDates = require('../helpers/dateHelper.js');
const errorHelper = require('../helpers/errorHelper.js');

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
        requestTable.retrieve(function (err, data) {
          if (err) {
            return reply.view('error', {
              error: errorHelper.databaseError
            });
          }
          // var userData = [];
          // data.map(function(user) {
          //   user.birth_date_formatted = formatDates.fixDate(user.birth_date, 'birthDate');
          //   user.time_stamp_formatted = formatDates.fixDate(user.time_stamp, 'timeStamp');
          //   userData.push(user);
          // });
          return reply.view('dashboard', { requests: data });
        });
      } else {
        return reply.view('error', {
          error : errorHelper.authenticationError
        });
      }
    }
  }
};
