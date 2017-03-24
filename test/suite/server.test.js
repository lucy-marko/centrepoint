const test = require('tape');
const fs = require('fs');
const path = require('path');
const server = require('../../src/server.js');

test('Check if server is running', t => {
  server.start(err => {
    t.error(err);
    server.stop();
    t.end();
  });
});

test('Check successful route & handling to index.html', function(t) {
  var options = {
    method: 'GET',
    url: '/'
  };
  server.inject(options, (res) => {
    t.equal(res.statusCode, 200, 'status code is 200');
    t.equal(res.request.path, '/');
    t.equal(res.request.method, 'get');
    t.end();
  });
});

test('Check failing route & handling', function(t) {
  var options = {
    method: 'GET',
    url: '/hamburger',
  };
  server.inject(options, (res) => {
    t.equal(res.statusCode, 404, 'status code is 404');
    // add a test to check html content
    t.end();
  });
});

test('Check login route', function(t) {
  var options = {
    method: 'GET',
    url: '/login?token=goodtoken'
  };
  server.inject(options, (res) => {
    t.equal(res.statusCode, 302, 'status code is 302');
    t.end();
  });
});

test('Check dashboard route', function(t) {
  var options = {
    method: 'GET',
    url: '/dashboard',
  };
  server.inject(options, (res) => {
    t.equal(res.statusCode, 401, 'status code is 401');
    t.equal(res.request.path, '/dashboard');
    t.equal(res.request.method, 'get');
    t.end();
  });
});

test('Check info route', function(t) {
  var options = {
    method: 'GET',
    url: '/info',
  };
  server.inject(options, (res) => {
    t.equal(res.statusCode, 401, 'status code is 401');
    t.equal(res.request.path, '/info');
    t.equal(res.request.method, 'get');
    t.end();
  });
});

test('Check submit route', function(t) {
  var options = {
    method: 'POST',
    url: '/submit',
  };
  server.inject(options, (res) => {
    t.equal(res.statusCode, 401, 'status code is 401');
    t.equal(res.request.path, '/submit');
    t.equal(res.request.method, 'post');
    t.end();
  });
});
