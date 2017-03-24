const sampleActivityData = require('../data/sampleActivityData');

/**
 * Copy the API of the normal yotiClient
 */
module.exports = {
  getActivityDetails: function (token) {
    const activityData = fakeYotiDatabase[token];
    if (activityData) {
      return Promise.resolve(activityData)
    } else {
      return Promise.reject()
    }
  }
};

// a map from tokens to activityData
const fakeYotiDatabase = {
  goodtoken: sampleActivityData
};
