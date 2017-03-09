module.exports.fixDate = function (date, dateType) {
  return dateType === 'birthDate'
  ? date.toString().slice(0,15)
  : date.toString().slice(0,24)
};
