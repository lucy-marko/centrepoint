const yotiClient = require('../services/yotiService.js');
const userTable = require('../database/tables/users');
const userHelper = require('../helpers/userHelper');
const errorMessages = require('../constants/errorMessages.js');

module.exports = function (token, callback) {
  yotiClient.getClient()
  .getActivityDetails(token)
  .then((activityDetails) => {
    let user = userHelper.getUser(activityDetails);
    userTable.getUserId(user, function (err, userData) {
      if (err) {
        callback(errorMessages.databaseError);
      }
      if (userData) {
        user.exists = true;
        user.admin = userData.admin;
      }
      callback(null, user);
    });
  }).catch((err) => {
    callback(errorMessages.loginError);
  });
};
