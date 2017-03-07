const fs = require('fs');
const path = require('path');
const YotiClient = require('yoti-node-sdk');
const userTable = require('../database/tables/users');
const userHelper = require('../helpers/userHelper');

const CLIENT_SDK_ID = "8a4dcb2a-9ed6-4d44-9a55-12b581bb5e64";
const PEM = fs.readFileSync(path.join(__dirname, '../../keys/help-access-security.pem'));
const yotiClient = new YotiClient(CLIENT_SDK_ID, PEM);
const loginError = "There was a problem with your Yoti, please log in again. If this problem persists, contact our technical team.";
const databaseError = "There was a problem processing your data, please try again. If this problem persists, contact our technical team.";

module.exports = {
  method: 'GET',
  path:'/info',
  handler: (req, reply) => {
    let token = req.query.token;
    if(!token) {
      console.log("No token provided");
      return reply.view('error', {
        error : loginError
      });
    }
    req.cookieAuth.set({ auth: token });
    yotiClient
    .getActivityDetails(token)
    .then((activityDetails) => {
      let user = userHelper.getUser(activityDetails);
      let firstName = userHelper.getFirstName(user);
      userTable.insert(user, function (err, data) {
        if (err) {
          console.log("Error adding user: ", err);
          return reply.view('error', {
            error : databaseError
          });
        }
        reply.view('info', { firstName });
      });
    }).catch((err) => {
      console.error(err);
      reply.view('error', {
        error : loginError
      });
    });
  }
};
