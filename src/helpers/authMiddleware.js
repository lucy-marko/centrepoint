const errorMessages = require('../constants/errorMessages.js');
const yotiHelper = require('../helpers/yotiHelper.js');

module.exports = function (req, reply) {
  let token = req.auth.credentials.auth;
  if(!token) {
    return reply.view('error', {
      error : errorMessages.loginError
    });
  }
  yotiHelper(token, function(err, user) {
    if (err) {
      return reply.view('error', {
        error : err
      });
    }
    reply(user);
  });
};
