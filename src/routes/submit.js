const authMiddleware = require('../helpers/authMiddleware.js');
const requestTable = require('../database/tables/requests');
const errorMessages = require('../constants/errorMessages.js');

module.exports = {
  method: 'POST',
  path:'/submit',
  config: {
    auth: {
      strategy: 'base'
    },
    pre: [
        { method: authMiddleware, assign: 'user' }
    ],
    handler: (req, reply) => {
      requestTable.insert(req.payload, req.pre.user, (err) => {
        if(err) {
          return reply.view('error', {
            error : errorMessages.databaseError
          });
        }
        reply.view('thankyou');
      });
    }
  }
};
