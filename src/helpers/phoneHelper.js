module.exports.formatMobile = function (user) {
  var newUser = Object.assign({}, user);
  newUser.localNumber = `0${user.phoneNumber.slice(3)}`;
  return newUser;
}
