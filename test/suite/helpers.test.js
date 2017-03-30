const test = require('tape');
const userHelper = require('../../src/helpers/userHelper.js');
const sampleActivityData = require('../data/sampleActivityDetails.js');
const sampleUser = require('../data/sampleUser.js');
const sampleNewAdmin = require('../data/sampleNewAdmin.js');
const requestHelper = require('../../src/helpers/requestHelper.js');
const phoneHelper = require('../../src/helpers/phoneHelper.js');

test('check that getUser function extracts a user id from activity details', function (t) {
  let user = userHelper.getUser(sampleActivityData);
  t.deepEqual(user, sampleUser);
  t.end();
});

test('check that getFirstName function returns a correctly formatted first name', function (t) {
  let name = userHelper.getFirstName('KERMIT THE FROG');
  t.equal(name, 'Kermit');
  t.end();
});

test('check that getLastName function returns a correctly formatted first name', function (t) {
  let name = userHelper.getLastName('SMITH');
  t.equal(name, 'Smith');
  t.end();
});

test('check that capitalizeNames function capitalizes names in user object', function (t) {
  let admin = userHelper.capitalizeNames(sampleNewAdmin.formInput);
  t.deepEqual(admin, sampleNewAdmin.formOutput);
  t.end();
});

test('check that formatStatus function capitalizes returns correct status', function (t) {
  let status = requestHelper.formatStatus('progress');
  t.equal(status, 'In progress');
  t.end();
});

test('check that formatMobile function returns a correct mobile number if it starts with 0', function (t) {
  t.equal(phoneHelper.formatMobile('07890444333'), '07890444333');
  t.end();
});

test('check that formatMobile function returns a correct mobile number if it starts with 44', function (t) {
  t.equal(phoneHelper.formatMobile('447890444333'), '07890444333');
  t.end();
});

test('check that formatMobile function returns a correct mobile number if it starts with 0 and contains spaces', function (t) {
  t.equal(phoneHelper.formatMobile('07890 444 333'), '07890444333');
  t.end();
});

test('check that formatMobile function returns a correct mobile number if it starts with 44 and contains spaces', function (t) {
  t.equal(phoneHelper.formatMobile('447890 444 333'), '07890444333');
  t.end();
});

