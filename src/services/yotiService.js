const fs = require('fs');
const path = require('path');
const env = require('env2');
env('./config.env');

const isProduction = process.env.NODE_ENV === 'production';

const YotiSDK = require('yoti-node-sdk');
let yotiClient;

module.exports.getClient = function() {
  if (! yotiClient) {
    const CLIENT_SDK_ID = process.env.SDK;
    let PEM;
    if (isProduction) PEM = process.env.PEM;
    else PEM = fs.readFileSync(path.join(__dirname, '../../key_pem/help-access-security.pem'));
    yotiClient = new YotiSDK(CLIENT_SDK_ID, PEM);
  };
  return yotiClient;
};
