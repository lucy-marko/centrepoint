const authMiddleware = require('../helpers/authMiddleware.js')
const requestTable = require('../database/tables/requests.js')
const errorHelper = require('../helpers/errorHelper.js');

module.exports = {
  method: 'GET',
  path:'/status',
  config: {
    auth: {
      strategy: 'base'
    },
    pre: [
        { method: authMiddleware, assign: 'user' }
    ],
    handler: (req, reply) => {
      console.log('id is ',req.query.id);
      console.log('active is ',req.query.active);
      let request = {
        id: req.query.id,
        active: req.query.active
      };
      requestTable.updateStatus(request, function (err, data) {
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
