module.exports = {
  method: 'GET',
  path:'/admin',
  handler: (req, reply) => {
    reply.view('index-admin', { landing: true });
  }
};
