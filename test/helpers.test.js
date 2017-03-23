const test = require('tape');
const userHelper = require('../src/helpers/userHelper.js');
const sampleActivityData = require('./sampleActivityData.js');
const sampleUser = require('./sampleUser.js');
const phoneHelper = require('../src/helpers/phoneHelper.js');

test('check that getUser function extracts a user id from activity details', function (t) {
  let user = userHelper.getUser(sampleActivityData);
  t.deepEqual(user, sampleUser);
  t.end();
});

test('check that getFirstName function returns a correctly formatted first name', function (t) {
  let name = userHelper.getFirstName('KERMIT THE FROG')
  t.equal(name, 'Kermit');
  t.end();
});

test('check that formatMobile function returns a correct mobile number if it starts with 0', function (t) {
  let newUser = phoneHelper.formatMobile({ phoneNumber: '07890444333'});
  t.equal(newUser.localNumber, '07890444333');
  t.end();
});

test('check that formatMobile function returns a correct mobile number if it starts with 44', function (t) {
  let newUser = phoneHelper.formatMobile({ phoneNumber: '447890444333'});
  t.equal(newUser.localNumber, '07890444333');
  t.end();
});

test('check that formatMobile function returns a correct mobile number if it starts with 0 and contains spaces', function (t) {
  let newUser = phoneHelper.formatMobile({ phoneNumber: '07890 444 333'});
  t.equal(newUser.localNumber, '07890444333');
  t.end();
});

test('check that formatMobile function returns a correct mobile number if it starts with 44 and contains spaces', function (t) {
  let newUser = phoneHelper.formatMobile({ phoneNumber: '447890 444 333'});
  t.equal(newUser.localNumber, '07890444333');
  t.end();
});
