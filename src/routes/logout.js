module.exports = {
  path: '/logout',
  method: 'GET',
  config: {
    auth: {
      strategy: 'base'
    },
    handler: (req, reply) => {
      req.cookieAuth.clear();
      reply.redirect('/');
    }
  }
};
