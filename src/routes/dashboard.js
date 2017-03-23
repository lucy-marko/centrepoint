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
          
          // minor point: i think usually code that prepares data for being displayed goes closer to the templates
          
          // if a variable is called a Date, it should be a date! `dashboardDataDate` is an array of... stuff
          // if fixDate took a date and returned a formatted date, this line could be moved inside the map
          // then you'd just have `formattedDashboardData = dashboardData.map(function...)`
          let dashboardDataDate = formatDates.fixDate(dashboardData);
          
          // i'd probably call this one formattedDashboardData
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
