const authMiddleware = require('../helpers/authMiddleware.js');
const requestTable = require('../database/tables/requests.js');
const userTable = require('../database/tables/users.js');
const userHelper = require('../helpers/userHelper.js');
const requestHelper = require('../helpers/requestHelper.js');
const formatDates = require('../helpers/dateHelper.js');
const errorHelper = require('../helpers/errorHelper.js');
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
              error: errorHelper.databaseError
            });
          }
          let dashboardDataDate = formatDates.fixDate(dashboardData);
          let formattedDashData = dashboardDataDate.map(function(request) {
            request.activeCap = requestHelper.formatStatus(request.active);
            if (request.admin_names) {
              request.admin_names = userHelper.getFirstName(request.admin_names);
              request.admin_family = userHelper.getLastName(request.admin_family);
            }
            return request;
          });
          userTable.retrieveAdmins(function (err, adminData) {
            if (err) {
              return reply.view('error', {
                error: errorHelper.databaseError
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
              requests: formattedDashData,
              admins: formattedAdminData
            });
          });
        });
      } else {
        return reply.view('error', {
          error : errorHelper.authenticationError
        });
      }
    }
  }
};
