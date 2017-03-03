module.exports = function (context) {
  let rawName = context.givenNames.split(' ')[0];
  let name = rawName.slice(0,1).concat(rawName.slice(1).toLowerCase());
  context.firstName = name;
}
