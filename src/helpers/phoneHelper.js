module.exports.formatMobile = function (phoneNumber) {
  let spaceMatcher = /\s/g;
  let numberMatcher = /^\+?(44)?0?(\d+)$/;
  return phoneNumber.replace(spaceMatcher, '').replace(numberMatcher, '0$2');
}
