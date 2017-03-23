const errorMessages = require('../constants/errorMessages.js');
const yotiHelper = require('../helpers/yotiHelper.js');
const userTable = require('../database/tables/users');
const userHelper = require('../helpers/userHelper');
const phoneHelper = require('../helpers/phoneHelper.js');

module.exports = {
  method: 'GET',
  path:'/login',
  handler: (req, reply) => {
    let token = req.query.token;
    if(!token) {
      return reply.view('error', {
        error : errorMessages.loginError
      });
    }
    req.cookieAuth.set({ auth: token });
    yotiHelper(token, function(err, user) {
      if (err) {
        return reply.view('error', {
          error : err
        });
      }
      if (user.exists) {
        if (user.admin === true) {
          return reply.redirect('/dashboard');
        }
        return reply.redirect('/info');
      }
      let newUser = phoneHelper.formatMobile(user);
      userTable.insert(newUser, function (err, data) {
        if (err) {
          return reply.view('error', {
            error : errorMessages.databaseError
          });
        }
        return reply.redirect('/info');
      });
    });
  }
};
