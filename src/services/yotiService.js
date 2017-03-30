const fs = require('fs');
const path = require('path');
const env = require('env2');
env('./config.env');

const isDevelopment = process.env.NODE_ENV === 'development';

const YotiSDK = require('yoti-node-sdk');
let yotiClient;

module.exports.getClient = function() {
  if (! yotiClient) {
    const CLIENT_SDK_ID = process.env.SDK;
    let PEM;
    if (isDevelopment) {
      console.log('1');
      PEM = fs.readFileSync(path.join(__dirname, '../../key_pem/help-access-security.pem'));
    }
    else {
      PEM = process.env.PEM;
      console.log('2');
    }
    yotiClient = new YotiSDK(CLIENT_SDK_ID, PEM);
  };
  return yotiClient;
};
