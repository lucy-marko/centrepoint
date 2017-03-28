const sampleActivityDetails = require('./sampleActivityDetails.js')
const sampleUser = require('./sampleUser.js');

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
  goodtoken: sampleActivityData
}
