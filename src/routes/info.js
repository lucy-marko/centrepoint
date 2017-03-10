const authMiddleware = require('../helpers/authMiddleware.js');
const userHelper = require('../helpers/userHelper');

module.exports = {
  method: 'GET',
  path:'/info',
  config: {
    auth: {
      strategy: 'base'
    },
    pre: [
        { method: authMiddleware, assign: 'user' }
    ],
    handler: (req, reply) => {
      let firstName = userHelper.getFirstName(req.pre.user);
      return reply.view('info', { firstName });
    }
  }
};
