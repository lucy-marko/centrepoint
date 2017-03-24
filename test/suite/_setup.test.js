const yotiService = require('../../src/services/yotiService');
const mockYotiClient = require('../helpers/mockYotiClient');

/**
 * This file starts with a '_', so it is the first file to be read by the testing framework. In this file we're going
 * to modify `yotiService` so that `yotiService.getClient` returns the mock client, instead of the real client.
 * 
 * A quick aside on `require()`:
 *   - The first time that node encounters a `require` for a particular module or file, it finds the file (or the
 *     entry point of the module), and reads and executes the code within it.
 *   - It then caches the final value of `module.exports`.
 *   - Subsequent `require()` calls to the same module or file will return the cached `module.exports`. The code
 *     will not be read or executed a second time.
 *     
 * In this file we `require` the `yotiService`. This is the first `require` of this file, so the `yotiService.js` file is 
 * read and executed. Node then returns to us the final value of `module.exports`, which is an object.
 * 
 * We then modify this object, overwriting the getClient function. This means that any subsequent `require`s of the
 * `yotiService` will receive our modified version. This allows us to test functions that use the `yotiClient` without
 * having to connect to Yoti itself.
 */

/**
 * Overwrite the getClient function to return a fake yoti client
 */
yotiService.getClient = function () {
  return mockYotiClient;
};
