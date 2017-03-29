const yotiService = require('../../src/services/yotiService.js');
const mockYotiClient = require('../helpers/mockYotiClient.js');

yotiService.getClient = function() {
  return mockYotiClient;
};
