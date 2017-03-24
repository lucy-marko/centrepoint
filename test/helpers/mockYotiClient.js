const sampleActivityData = require('../data/sampleActivityData');

/**
 * Copy the API of the normal yotiClient
 */
module.exports = {
  getActivityDetails: function (token) {
    const activityDetails = activityDetailsByToken[token];
    if (activityDetails) {
      return Promise.resolve(activityDetails)
    } else {
      return Promise.reject()
    }
  }
};

const activityDetailsByToken = {
  goodtoken: sampleActivityData
};
