const authMiddleware = require('../helpers/authMiddleware.js')
const requestTable = require('../database/tables/requests.js')
const errorHelper = require('../helpers/errorHelper.js');

module.exports = {
  method: 'GET',
  path:'/new-admin',
  config: {
    auth: {
      strategy: 'base'
    },
    pre: [
        { method: authMiddleware, assign: 'user' }
    ],
    handler: (req, reply) => {
      reply.view('new-admin');
    }
  }
};
