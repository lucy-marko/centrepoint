const sampleActivityDetails = require('../data/sampleActivityDetails.js')
const sampleUser = require('../data/sampleUser.js');

module.exports.getActivityDetails = function (token) {
  const activityDetails = mockYotiDatabase[token];
  if (activityDetails) {
    Promise.resolve(activityDetails);
  }
  else {
    Promise.reject(sampleUser);
  }
};

const mockYotiDatabase = {
  goodtoken: sampleActivityDetails
}
