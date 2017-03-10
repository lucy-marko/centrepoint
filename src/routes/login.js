const errorHelper = require('../helpers/errorHelper.js');
const yotiHelper = require('../helpers/yotiHelper.js');
const userTable = require('../database/tables/users');
const userHelper = require('../helpers/userHelper');

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
      userTable.insert(user, function (err, data) {
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
