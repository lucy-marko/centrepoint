module.exports.getRequest = function (userData, activityDetails) {
  let userDataWithId = userData;
  userDataWithId.userId = activityDetails.receipt.remember_me_id;
  return userDataWithId;
};
