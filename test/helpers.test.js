const test = require('tape');
const userHelper = require('../src/helpers/userHelper.js');
const sampleActivityData = require('./sampleActivityData.js')
const sampleUser = require('./sampleUser.js')

test('check that getUser function extracts a user id from activity details', function (t) {
  let user = userHelper.getUser(sampleActivityData);
  t.deepEqual(user, sampleUser);
  t.end();
});

test('check that getFirstName function returns a correctly formatted first name', function (t) {
  let name = userHelper.getFirstName({ givenNames: 'KERMIT THE FROG' })
  t.equal(name, 'Kermit');
  t.end();
});
