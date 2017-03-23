const errorHelper = require('../helpers/errorHelper.js');
const yotiHelper = require('../helpers/yotiHelper.js');

module.exports = function (req, reply) {
  let token = req.auth.credentials.auth;
  if(!token) {
    return reply.view('error', {
      error : errorHelper.loginError
    });
  }
  // no need to assign to user here
  // yotiHelper doesn't return anything, instead it provides the user in the callback
  let user = yotiHelper(token, function(err, user) {
    if (err) {
      return reply.view('error', {
        error : err
      });
    }
    reply(user);
  });
};
