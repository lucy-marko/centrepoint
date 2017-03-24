const userTable = require('../database/tables/users');
const userHelper = require('../helpers/userHelper');
const errorHelper = require('../helpers/errorHelper.js');

// refactored the creation of the yotiClient into a function for testing purposes
// see `test/server/_setup.test.js`
const yotiClient = require('../services/yotiService').getClient();

module.exports = function (token, callback) {
  yotiClient
    .getActivityDetails(token)
    .then((activityDetails) => {
      let user = userHelper.getUser(activityDetails);
      userTable.queryUserId(user, function (err, userData) {
        if (err) {
          callback(errorHelper.databaseError);
        }
        if (userData) {
          user.exists = true;
          user.admin = userData.admin;
        }
        callback(null, user);
      });
    }).catch((err) => {
    callback(errorHelper.loginError);
  });
};
