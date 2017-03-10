module.exports.fixDate = function (dataArr) {
  return dataArr.map(function (userData) {
    userData.birth_date_formatted = userData.birth_date.toString().slice(0,15)
    userData.time_stamp_formatted = userData.time_stamp.toString().slice(0,24)
    return userData;
  })
};
