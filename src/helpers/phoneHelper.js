module.exports.formatMobile = function (user) {
  let newUser = Object.assign({}, user);
  let numStr = `0${user.phoneNumber.slice(2)}`;
  number = numStr.replace(/\s+/g, '');
  newUser.localNumber = number;
  return newUser;
}
