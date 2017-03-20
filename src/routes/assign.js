const authMiddleware = require('../helpers/authMiddleware.js')
const requestTable = require('../database/tables/requests.js')
const errorHelper = require('../helpers/errorHelper.js');

module.exports = {
  method: 'GET',
  path:'/assign',
  config: {
    auth: {
      strategy: 'base'
    },
    pre: [
        { method: authMiddleware, assign: 'user' }
    ],
    handler: (req, reply) => {
      let request = {
        id: req.query.id,
        admin: req.query.admin
      };
      requestTable.updateAssigned(request, function (err, data) {
        if (err) {
          return reply.view('error', {
            error: errorHelper.databaseError
          });
        }
        reply.redirect('/dashboard');
      });
    }
  }
};
