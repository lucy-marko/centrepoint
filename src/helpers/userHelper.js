module.exports.getUser = function (activityDetails) {
  let user = activityDetails.profile;
  user.id = activityDetails.receipt.remember_me_id;
  return user;
};

module.exports.getFirstName = function (givenNames) {
  let rawFirstName = givenNames.split(' ')[0];
  return rawFirstName.slice(0,1).concat(rawFirstName.slice(1).toLowerCase());
};

module.exports.getLastName = function (familyName) {
  return familyName.slice(0,1).concat(familyName.slice(1).toLowerCase());
};
