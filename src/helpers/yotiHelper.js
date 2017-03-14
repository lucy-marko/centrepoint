const fs = require('fs');
const path = require('path');

const YotiClient = require('yoti-node-sdk');
const CLIENT_SDK_ID = process.env.SDK;
const PEM = fs.readFileSync(path.join(__dirname, '../../key_pem/help-access-security.pem'));
const yotiClient = new YotiClient(CLIENT_SDK_ID, PEM);

const userTable = require('../database/tables/users');
const userHelper = require('../helpers/userHelper');
const errorHelper = require('../helpers/errorHelper.js')

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
