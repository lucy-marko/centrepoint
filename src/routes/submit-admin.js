const authMiddleware = require('../helpers/authMiddleware.js');
const userTable = require('../database/tables/users.js');
const caseHelper = require('../helpers/capsHelper.js');
const errorHelper = require('../helpers/errorHelper.js');
const phoneHelper = require('../helpers/phoneHelper.js');

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
      let newUser = phoneHelper.formatMobile(caseHelper.allCaps(req.payload));
      let result = {};

      userTable.updateAdmin(newUser, (err, data) => {
        if(err || data.rowCount === 0) {
          result.error = 'We could not add this user as an admin, please try again';
          console.log(result.error);
        } else if (data.rowCount === 1) {
          result.success = 'Admin was successfully added';
        }
        reply.view('new-admin', result);
      });
      
    }
  }
};
