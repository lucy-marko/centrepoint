module.exports = {
    method: '*',
    path: '/{p*}', // catch-all path
    handler: (req, reply) => {
      reply.view('error', {
        error : "Requested page not found."
      });
    }
};
