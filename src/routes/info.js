const fs = require('fs');
const path = require('path');
const YotiClient = require('yoti-node-sdk');

const CLIENT_SDK_ID = process.env.SDK;
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
    let promise = yotiClient.getActivityDetails(token);
    promise.then((activityDetails) => {
      let context = activityDetails.profile;
      let getFirstName = (context) => {
        let rawName = context.givenNames.split(' ')[0];
        let name = rawName.slice(0,1).concat(rawName.slice(1).toLowerCase());
        context.firstName = name;
      }
      getFirstName(context);
      reply.view('info', context);
    }).catch((err) => {
      console.error(err);
      reply.view('error', {
        error : err
      });
      return;
    })
  }
}];
