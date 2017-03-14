module.exports.formatMobile = function (user) {
  let newUser = Object.assign({}, user);
  let numStr = newUser.phoneNumber;
  if (numStr.slice(0,2) === '44') {
    numStr = `0${user.phoneNumber.slice(2)}`;
  }
  number = numStr.replace(/\s+/g, '');
  newUser.localNumber = number;
  console.log(newUser);
  return newUser;
}
