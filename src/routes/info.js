const fs = require('fs');
const path = require('path');
const YotiClient = require('yoti-node-sdk');
const yotiToDb = require('../helpers/userToDatabase.js');
const nameHandler = require('../helpers/name-handler.js');

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
    let promise = yotiClient.getActivityDetails(token);
    promise.then((activityDetails) => {
      let context = activityDetails.profile;
      context.userId = activityDetails.receipt.remember_me_id;

      nameHandler(context);

      yotiToDb(context, function (err, data) {
        if(err) {
          console.log("There was an error adding user: ", err);
        }
        reply.view('info', context);
      });
    }).catch((err) => {
      console.error(err);
      reply.view('error', {
        error : err
      });
      return;
    })
  }
}];
