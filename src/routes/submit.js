const authMiddleware = require('../helpers/authMiddleware.js');
const requestTable = require('../database/tables/requests');
const errorHelper = require('../helpers/errorHelper.js');

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
            error : errorHelper.databaseError
          });
        }
        reply.view('thankyou');
      });
    }
  }
};
