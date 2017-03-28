const sampleActivityDetails = require('../data/sampleActivityDetails.js')
const sampleUser = require('../data/sampleUser.js');

module.exports.getActivityDetails = function (token) {
  const activityDetails = mockYotiDatabase[token];
  if (activityDetails) {
    return Promise.resolve(activityDetails);
  }
  else {
    return Promise.reject();
  }
};

const mockYotiDatabase = {
  goodtoken: sampleActivityDetails
}
