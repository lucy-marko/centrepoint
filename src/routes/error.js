module.exports = {
    method: '*',
  // why does this catch all routes that start with 'p' ?
    path: '/{p*}', // catch-all path
    handler: (req, reply) => {
      reply.view('error', {
        error : "Requested page not found."
      }).code(404);
    }
};
