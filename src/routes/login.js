const errorHelper = require('../helpers/errorHelper.js');
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
        error : errorHelper.loginError
      });
    }
    req.cookieAuth.set({ auth: token });
    // no need to assign to user here, yotiHelper doesn't return anything
    // and even if it did, it's the user in the callback that we care about
    let user = yotiHelper(token, function(err, user) {
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
      // i'd expect phoneHelper.formatMobile to take in an unformatted mobile number and return a formatted one
      // so newUser.localNumber = phoneHelper.formatMoble(user.phoneNumber)
      let newUser = phoneHelper.formatMobile(user);
      userTable.insert(newUser, function (err, data) {
        if (err) {
          return reply.view('error', {
            error : errorHelper.databaseError
          });
        }
        return reply.redirect('/info');
      });
    });
  }
};
