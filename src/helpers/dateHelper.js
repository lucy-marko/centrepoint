/**
 * What does this do? Maybe add some comments?
 * Another function I'd expect to take a date as input and return a 'fixed' date, rather than
 * fixing the user in place
 */
module.exports.fixDate = function (dashboardData) {
  return dashboardData.map(function (userData) {
    userData.birth_date_formatted = userData.birth_date.toString().slice(0,15);
    userData.time_stamp_formatted = userData.time_stamp.toString().slice(0,21);
    return userData;
  });
};
