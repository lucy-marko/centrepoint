const authMiddleware = require('../helpers/authMiddleware.js')
const retrieveData = require('../database/tables/requests.js')
const formatDates = require('../helpers/dateHelper.js');
const databaseError = "There was a problem retrieving data, please try again. If this problem persists, contact our technical team.";
const authenticationError = "You are not authenticated to access the data. If you are a Centrepoint administrator, contact our technical team."

module.exports = {
  method: 'GET',
  path:'/dashboard',
  config: {
    auth: {
      strategy: 'base'
    },
    pre: [
        { method: authMiddleware, assign: 'data' }
    ],
    handler: (req, reply) => {
      if (req.pre.data.admin === false) {
        return reply.view('error', {
          error : authenticationError
        });
      }
      retrieveData.retrieve(function (err, data) {
        if (err) {
          console.log("Error retrieving requests: ", err);
          return reply.view('error', {
            error: databaseError
          });
        }
        formatDates.fixDate(data);

        reply.view('dashboard', { requests: data });
      });
    }
  }
};
