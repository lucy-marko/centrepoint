const authMiddleware = require('../helpers/authMiddleware.js');
const userHelper = require('../helpers/userHelper');
const loginError = "There was a problem with your Yoti, please log in again. If this problem persists, contact our technical team.";
const databaseError = "There was a problem processing your data, please try again. If this problem persists, contact our technical team.";

module.exports = {
  method: 'GET',
  path:'/info',
  config: {
    auth: {
      strategy: 'base'
    },
    pre: [
        { method: authMiddleware, assign: 'userData' }
    ],
    handler: (req, reply) => {
      let firstName = userHelper.getFirstName(req.pre.userData.given_names);
      if (req.pre.userData) {
        if (req.pre.userData.admin) {
          return reply.redirect('/dashboard');
        }
        return reply.view('info', { firstName });
      }
      userTable.insert(user, function (err, data) {
        if (err) {
          console.log("Error adding user: ", err);
          return reply.view('error', {
            error : databaseError
          });
        }
        return reply.view('info', { firstName });
      });
    }
  }
};
