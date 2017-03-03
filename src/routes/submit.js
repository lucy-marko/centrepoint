const fs = require('fs');
const path = require('path');
const YotiClient = require('yoti-node-sdk');
const addFormData = require('../helpers/add-form-data');

const CLIENT_SDK_ID = "8a4dcb2a-9ed6-4d44-9a55-12b581bb5e64";
const PEM = fs.readFileSync(path.join(__dirname, '../../keys/help-access-security.pem'));
const yotiClient = new YotiClient(CLIENT_SDK_ID, PEM);

module.exports = [{
  method: 'POST',
  path:'/submit',
  config: {
    auth: {
      strategy: 'base'
    },
    handler: (req, reply) => {
      let token = req.auth.credentials.auth;
      if(!token) {
        reply.view('error', {
          error : "No token has been provided."
        });
        return;
      }
      let promise = yotiClient.getActivityDetails(token);
      promise.then((activityDetails) => {
        let requestUserId = activityDetails.receipt.remember_me_id;

        addFormData(req.payload, requestUserId, (err) => {
          if(err) {
            console.log("Form data error: ", err);
          }
          return reply.view('thankyou');
        });

      }).catch((err) => {
        console.error(err);
        reply.view('error', {
          error : err
        });
        return;
      })
    }
  }
}];
