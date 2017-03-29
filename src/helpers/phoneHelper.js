module.exports.formatMobile = function (phoneNumber) {
  let numberMatch = /^\+?(44)?0?(\d+)$/;
  return phoneNumber.replace(numberMatch, '0$2');
}
