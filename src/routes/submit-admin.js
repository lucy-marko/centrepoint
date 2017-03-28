const authMiddleware = require('../helpers/authMiddleware.js');
const userTable = require('../database/tables/users.js');
const userHelper = require('../helpers/userHelper.js');
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
      let newAdmin = userHelper.capitalizeNames(req.payload);
      console.log(newAdmin);
      newAdmin.localNumber = phoneHelper.formatMobile(newAdmin.phoneNumber);
      let result = {};
      userTable.updateAdmin(newAdmin, (err, data) => {
        if(err || data.rowCount === 0) {
          result.error = 'We could not add this user as an admin, please try again';
        } else if (data.rowCount === 1) {
          result.success = 'Admin was successfully added';
        }
        reply.view('new-admin', result);
      });

    }
  }
};
