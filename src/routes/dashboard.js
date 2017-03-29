const authMiddleware = require('../helpers/authMiddleware.js');
const requestTable = require('../database/tables/requests.js');
const userTable = require('../database/tables/users.js');
const userHelper = require('../helpers/userHelper.js');
const requestHelper = require('../helpers/requestHelper.js');
const formatDates = require('../helpers/dateHelper.js');
const errorMessages = require('../constants/errorMessages.js');
const dateHelper = require('../helpers/dateHelper.js');

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
              error: errorMessages.databaseError
            });
          }
          let formattedDashboardData = dashboardData.map(function (request) {
            let newRequest = Object.assign({}, request);
            newRequest.birth_date = newRequest.birth_date.toString().slice(0,15);
            newRequest.time_stamp = newRequest.time_stamp.toString().slice(0,21);
            newRequest.statusCap = requestHelper.formatStatus(newRequest.status);
            if (newRequest.admin_given_names) {
              newRequest.admin_given_names = userHelper.getFirstName(newRequest.admin_given_names);
              newRequest.admin_family_name = userHelper.getLastName(newRequest.admin_family_name);
            }
            return newRequest;
          });
          userTable.retrieveAdmins(function (err, adminData) {
            if (err) {
              return reply.view('error', {
                error: errorMessages.databaseError
              });
            }
            let formattedAdminData = adminData.map(function(admin) {
              return {
                firstName: userHelper.getFirstName(admin.given_names),
                lastName: userHelper.getLastName(admin.family_name),
                id: admin.user_id
              }
            });
            return reply.view('dashboard', {
              requests: formattedDashboardData,
              admins: formattedAdminData
            });
          });
        });
      } else {
        return reply.view('error', {
          error : errorMessages.authenticationError
        });
      }
    }
  }
};
