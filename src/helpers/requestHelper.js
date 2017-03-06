module.exports.getRequest = function (payload, activityDetails) {
  let request = payload;
  request.user_id = activityDetails.receipt.remember_me_id;
  return request;
};
