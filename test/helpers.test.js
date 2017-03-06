const test = require('tape');
const userHelper = require('../src/helpers/userHelper.js');
const sampleActivityObj = require('../sampleActivityData.js')

test('check that getUser function extracts a user id from activity details', function (t) {
  let user = userHelper.getUser(sampleActivityObj);
  t.equal(typeof user.id, 'string');
  t.equal(user.id.length, 64);
  t.end();
});

test('check that getFirstName function returns a correctly formatted first name', function (t) {
  let name = userHelper.getFirstName({ givenNames: 'KERMIT THE FROG' })
  t.equal(name, 'Kermit');
  t.end();
});
