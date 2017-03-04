/**
 *
 * Contains functions that either:
 *
 * - Take a `user` as input, and produce some derived property (like the user's first name), or
 * - Produce a `user` from input data.
 *
 * This is a functional approach, where input data is not modified. If you want functions that modify input data,
 * you should probably be using Object Oriented programming.
 *
 */


/**
 * Returns an object that can be inserted into the users table
 *
 * @param activityDetails - from yotiClient.getActivityDetails(token)
 */
module.exports.createFromActivityDetails = function (activityDetails) {
  let user = activityDetails.profile;
  user.id = activityDetails.receipt.remember_me_id;
  return user;
};

module.exports.getFirstName = function (user) {
  let rawFirstName = user.givenNames.split(' ')[0];
  return rawFirstName.slice(0,1).concat(rawFirstName.slice(1).toLowerCase());
};
