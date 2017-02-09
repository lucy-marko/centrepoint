module.exports = [{
  method: 'GET',
  path:'/thankyou',
  handler: (req, reply) => {
    reply.view('submit');
  }
}];
