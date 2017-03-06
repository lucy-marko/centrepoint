module.exports.getRequest = function (payload, activityDetails) {
  let request = payload;
  request.userId = activityDetails.receipt.remember_me_id;
  return request;
};
