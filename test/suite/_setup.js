const mockYotiClient = require('../helpers/mockYotiClient');

/**
 * This file starts with a '_', so it is the first file to be read by the testing framework. In this file we're going
 * to modify `yotiService` so that `yotiService.getClient` returns the mock client, instead of the real client. This
 * means that all subsequent tests will use our mocked `yotiClient`.
 * 
 * A quick aside on `require()`:
 *   - The first time that node encounters a `require` for a particular module or file, it finds the file (or the
 *     entry point of the module), and reads and executes the code within it.
 *   - It then caches the final value of `module.exports`.
 *   - Subsequent `require()` calls to the same module or file will return the cached `module.exports`. The file
 *     will not be read or executed a second time.
 *     
 * Below, we `require` the file `../../src/services/yotiService.js`. This is the first `require` of `yotiService.js`, so 
 * the file is read and executed. Node then returns to us the final value of `module.exports`, which is an object.
 */
const yotiService = require('../../src/services/yotiService');

/**
 * We then modify this object, overwriting the getClient function. As `yotiService` is already cached, any subsequent
 * `require`s of `yotiService` will receive our modified version of getClient. This allows us to test functions that
 * use `yotiClient` without having to connect to Yoti itself.
 */
yotiService.getClient = function () {
  return mockYotiClient;
};
