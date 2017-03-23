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
          console.log('1 ',dashboardData);
          let formattedDashboardData = dashboardData.map(function (request) {
            request.birth_date = request.birth_date.toString().slice(0,15);
            request.time_stamp = request.time_stamp.toString().slice(0,21);
            request.activeCap = requestHelper.formatStatus(request.active);
            if (request.admin_names) {
              request.admin_names = userHelper.getFirstName(request.admin_names);
              request.admin_family = userHelper.getLastName(request.admin_family);
            }
            return request;
          });
          console.log('2 ',dashboardData);
          console.log('3 ',formattedDashboardData);
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
