const fs = require('fs');
const path = require('path');

const env = require('env2');
env('./config.env');

const YotiClient = require('yoti-node-sdk');
const CLIENT_SDK_ID = process.env.SDK;
const PEM = fs.readFileSync(path.join(__dirname, '../../keys/help-access-security.pem'));
const yotiClient = new YotiClient(CLIENT_SDK_ID, PEM);

const userTable = require('../database/tables/users');
const userHelper = require('../helpers/userHelper');
const errorMessages = require('../constants/errorMessages.js');

module.exports = function (token, callback) {
  yotiClient
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
