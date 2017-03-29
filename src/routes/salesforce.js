const env = require('env2')('./config.env');
const authMiddleware = require('../helpers/authMiddleware.js');
const nforce = require('nforce');
const hapi = require('hapi');
const username = process.env.USERNAME;
const password = process.env.PASSWORD;
const securityToken = process.env.SECURITY_TOKEN;


module.exports = {
  method: 'GET',
  path:'/salesforce',
  // config: {
  //   auth: {
  //     strategy: 'base'
  //   },
  //   pre: [
  //       { method: authMiddleware, assign: 'user' }
  //   ],
    handler: (req, reply) => {
      const org = nforce.createConnection({
        clientId: process.env.SALESFORCE_KEY,
        clientSecret: process.env.SALESFORCE_SECRET,
        redirectUri: process.env.SF_REDIRECT,
        environment: 'sandbox',  // optional, salesforce 'sandbox' or 'production', production default
        mode: 'single' // optional, 'single' or 'multi' user mode, multi default
      });

      org.authenticate({ username: username, password: password, securityToken: securityToken }, function(err, resp) {
        if(!err) {
          console.log('callback was called');
          console.log('callback response object: ', resp);
          org.query({ query: 'SELECT Id, Name FROM Account' }, function(err, res) {
            if(err) return console.error(err);
            else return console.log(res.records);
          });
        } else {
          console.log('Error: ' + err.message);
        }
      });
    }
    // }
};

// SELECT Name FROM Account LIMIT 1
