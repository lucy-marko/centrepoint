module.exports.allCaps = function (user) {
  let newUser = {
    givenNames: user.givenNames.toUpperCase(),
    familyName: user.familyName.toUpperCase()
  }
  console.log(newUser);
  return newUser;
};
