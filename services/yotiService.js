const fs = require('fs');
const path = require('path');
const env = require('env2');
env('./config.env');

const YotiClient = require('yoti-node-sdk');
let yotiClient;

module.exports = function() {
  if (! yotiClient) {
    const CLIENT_SDK_ID = process.env.SDK;
    const PEM = fs.readFileSync(path.join(__dirname, '../../key_pem/help-access-security.pem'));
    yotiClient = new YotiClient(CLIENT_SDK_ID, PEM);
  };
  return yotiClient;
};