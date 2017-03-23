const authMiddleware = require('../helpers/authMiddleware.js');

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
