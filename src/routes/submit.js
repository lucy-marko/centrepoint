const fs = require('fs');
const path = require('path');
const YotiClient = require('yoti-node-sdk');
const requestTable = require('../database/tables/requests');
const requestHelper = require('../helpers/requestHelper');

const CLIENT_SDK_ID = "8a4dcb2a-9ed6-4d44-9a55-12b581bb5e64";
const PEM = fs.readFileSync(path.join(__dirname, '../../keys/help-access-security.pem'));
const yotiClient = new YotiClient(CLIENT_SDK_ID, PEM);
const loginError = "There was a problem accessing your Yoti, please log in again. If this problem persists, contact our technical team.";
const databaseError = "There was a problem processing your data, please try again. If this problem persists, contact our technical team.";

module.exports = {
  method: 'POST',
  path:'/submit',
  config: {
    auth: {
      strategy: 'base'
    },
    handler: (req, reply) => {
      let token = req.auth.credentials.auth;
      if(!token) {
        console.log("No token provided");
        reply.view('error', {
          error : yotiError
        });
      }
      yotiClient
      .getActivityDetails(token)
      .then((activityDetails) => {
        let request = requestHelper.getRequest(req.payload, activityDetails);
        requestTable.insert(request, (err) => {
          if(err) {
            console.log("Form data error: ", err);
            reply.view('error', {
              error : databaseError
            });
          }
          reply.view('thankyou');
        });
      }).catch((err) => {
        console.error(err);
        reply.view('error', {
          error : yotiError
        });
      })
    }
  }
};
