const authMiddleware = require('../helpers/authMiddleware.js');
const userTable = require('../database/tables/users.js');
const caseHelper = require('../helpers/capsHelper.js');
const errorHelper = require('../helpers/errorHelper.js');

module.exports = {
  method: 'POST',
  path:'/submit-admin',
  config: {
    auth: {
      strategy: 'base'
    },
    pre: [
        { method: authMiddleware, assign: 'user' }
    ],
    handler: (req, reply) => {
      let newUser = caseHelper.allCaps(req.payload);
      let result = {};
      userTable.updateAdmin(newUser, (err) => {
        if(err) {
          result.error = 'We could not add this user as an admin, please try again';
          console.log(result.error)
          return reply.view('new-admin', result);
        }
        result.success = 'Admin was successfully added';
        reply.view('new-admin', result);
      });
    }
  }
};
