module.exports.allCaps = function (user) {
  let newUser = {
    givenNames: user.givenNames.toUpperCase(),
    familyName: user.familyName.toUpperCase(),
    phoneNumber: user.phoneNumber
  }
  console.log(newUser);
  return newUser;
};
