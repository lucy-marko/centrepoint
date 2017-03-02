module.exports = [{
  method: 'POST',
  path:'/submit',
  handler: (req, reply) => {
    console.log('Here is the form: ', req.payload);
    reply.redirect('/thankyou');
  }
}];
