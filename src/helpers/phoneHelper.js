/**
 * as mentioned in other places, i think this function should take `user.phoneNumber` and return `localNumber`
 */
module.exports.formatMobile = function (user) {
  let newUser = Object.assign({}, user);
  let numStr = newUser.phoneNumber;
  if (numStr.slice(0,2) === '44') {
    numStr = `0${user.phoneNumber.slice(2)}`;
  }
  // you need to put `var number` here, otherwise you'll get a global variable
  number = numStr.replace(/\s+/g, '');
  newUser.localNumber = number;
  console.log(newUser);
  return newUser;
}
