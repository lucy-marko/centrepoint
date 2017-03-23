/**
 * 
 * This could be
 * 
 * let newUser = {}
 * Object.keys(user).forEach(key => {
 *     value = user[key]
 *     if (typeof value === 'string') {
 *         newUser[key] = value.toUpperCase()
 *     } else {
 *         newUser[key] = value
 *     }
 * })
 * return newUser
 *
 */
module.exports.allCaps = function (user) {
  let newUser = {
    givenNames: user.givenNames.toUpperCase(),
    familyName: user.familyName.toUpperCase(),
    phoneNumber: user.phoneNumber
  }
  console.log(newUser);
  return newUser;
};
