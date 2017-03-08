const authMiddleware = require('../helpers/authMiddleware.js');
const requestTable = require('../database/tables/requests');
const requestHelper = require('../helpers/requestHelper');
const databaseError = "There was a problem processing your data, please try again. If this problem persists, contact our technical team.";

module.exports = {
  method: 'POST',
  path:'/submit',
  config: {
    auth: {
      strategy: 'base'
    },
    pre: [
        { method: authMiddleware, assign: 'userData' }
    ],
    handler: (req, reply) => {
      requestTable.insert(req.payload, req.pre.userData, (err) => {
        if(err) {
          console.log("Form data error: ", err);
          return reply.view('error', {
            error : databaseError
          });
        }
        reply.view('thankyou');
      });
    }
  }
};
