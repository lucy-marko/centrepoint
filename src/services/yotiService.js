const fs = require('fs');
const path = require('path');

const env = require('env2');
env('./config.env');

const YotiClient = require('yoti-node-sdk');

/**
 * This is the 'singleton' pattern.
 * You have a private object (yotiClient) that is accessed through a public method (getClient).
 * The first time getClient() is called, yotiClient is created. From then on, the existing client is returned.
 */
let yotiClient;
module.exports.getClient = function () {
  if (!yotiClient) {
    const CLIENT_SDK_ID = process.env.SDK;
    const PEM = fs.readFileSync(path.join(__dirname, '../../key_pem/help-access-security.pem'));
    yotiClient = new YotiClient(CLIENT_SDK_ID, PEM);
  }
  return yotiClient;
};
