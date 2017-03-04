const fs = require('fs');
const path = require('path');
const YotiClient = require('yoti-node-sdk');
const userTable = require('../database/tables/users');
const userHelper = require('../helpers/userHelper');

const CLIENT_SDK_ID = "8a4dcb2a-9ed6-4d44-9a55-12b581bb5e64";
const PEM = fs.readFileSync(path.join(__dirname, '../../keys/help-access-security.pem'));
const yotiClient = new YotiClient(CLIENT_SDK_ID, PEM);

module.exports = [{
  method: 'GET',
  path:'/info',
  handler: (req, reply) => {
    let token = req.query.token;
    if(!token) {
      reply.view('error', {
        error : "No token has been provided."
      });
      return;
    }
    req.cookieAuth.set({auth: token});

    yotiClient
    .getActivityDetails(token)
    .then((activityDetails) => {
      let user = userHelper.createFromActivityDetails(activityDetails);
      let firstName = userHelper.getFirstName(user);
      userTable.insert(user, function (err, data) {
        if (err) {
          console.log("There was an error adding user: ", err);
        }
        let context = Object.assign({}, user, { firstName });
        reply.view('info', context);
      });
    })
    .catch((err) => {
      console.error(err);
      reply.view('error', {error: err});
    })
  }
}];
