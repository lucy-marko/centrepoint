module.exports = [{
  method: 'GET',
  path:'/info',
  handler: (req, reply) => {
    let token = req.query.token;
    if(!token) {
      reply.view('error', {
        error : "No token has been provided."
      });
      return;
    }
    let promise = yotiClient.getActivityDetails(token);
    promise.then((activityDetails) => {
      let userData = activityDetails.getUserId();
      reply.view('index', {
        userData: userData
      });
    }).catch((err) => {
      console.error(err);
      reply.view('error', {
        error : err
      });
      return;
    })
  }
}];
