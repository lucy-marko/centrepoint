const test = require('tape');
const fs = require('fs');
const path = require('path');
const server = require('../../src/server.js');
const sampleRequest = require('../data/sampleRequest.js');

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

test('Check info route', function(t) {
  var options = {
    method: 'GET',
    url: '/info',
    credentials: {
      auth: 'goodtoken'
    }
  };
  server.inject(options, (res) => {
    t.equal(res.statusCode, 200, 'status code is 200');
    t.equal(res.request.path, '/info');
    t.equal(res.request.method, 'get');
    t.end();
  });
});

test('Check info route (no cookie)', function(t) {
  var options = {
    method: 'GET',
    url: '/info'
  };
  server.inject(options, (res) => {
    t.equal(res.statusCode, 401, 'status code is 401');
    t.equal(res.request.path, '/info');
    t.equal(res.request.method, 'get');
    t.end();
  });
});

test('Check logout route', function(t) {
  var options = {
    method: 'GET',
    url: '/logout',
    credentials: {
      auth: 'goodtoken'
    }
  };
  server.inject(options, (res) => {
    t.equal(res.statusCode, 302, 'status code is 302');
    t.end();
  });
});

test('Check submit route', function(t) {
  var options = {
    method: 'POST',
    url: '/submit',
    payload: sampleRequest,
    credentials: {
      auth: 'goodtoken'
    }
  };
  server.inject(options, (res) => {
    t.equal(res.statusCode, 200, 'status code is 200');
    t.equal(res.request.path, '/submit');
    t.equal(res.request.method, 'post');
    t.end();
  });
});

test('Check dashboard route', function(t) {
  var options = {
    method: 'GET',
    url: '/dashboard',
    credentials: {
      auth: 'goodtoken'
    }
  };
  server.inject(options, (res) => {
    t.equal(res.statusCode, 200, 'status code is 200');
    t.end();
  });
});

test('Check status route (unsuccessful)', function(t) {
  var options = {
    method: 'GET',
    url: '/status?id=1&status=open',
    credentials: {
      auth: 'goodtoken'
    }
  };
  server.inject(options, (res) => {
    t.equal(res.statusCode, 302, 'status code is 302');
    t.end();
  });
});

test('Check status route (unsuccessful)', function(t) {
  var options = {
    method: 'GET',
    url: '/status?id=hello&status=closed',
    credentials: {
      auth: 'goodtoken'
    }
  };
  server.inject(options, (res) => {
    const html = res.result.toString();
    t.equal(res.statusCode, 200, 'status code is 200');
    t.ok(html.indexOf("There was a problem retrieving data, please try again.") > -1);
    t.end();
  });
});

test('Check assign route (successful)', function(t) {
  var options = {
    method: 'GET',
    url: '/assign?id=1&admin=Re5xYlrYsu8ctaxPN2g7zZYGHSKOHotA6UYABPmadPvMaPs3ssziv0iEBd75zfi2',
    credentials: {
      auth: 'goodtoken'
    }
  };
  server.inject(options, (res) => {
    t.equal(res.statusCode, 302, 'status code is 302');
    t.end();
  });
});

test('Check assign route (unsuccessful)', function(t) {
  var options = {
    method: 'GET',
    url: '/assign?id=nonexistentadmin',
    credentials: {
      auth: 'goodtoken'
    }
  };
  server.inject(options, (res) => {
    const html = res.result.toString();
    t.equal(res.statusCode, 200, 'status code is 200');
    t.ok(html.indexOf("There was a problem retrieving data, please try again.") > -1);
    t.end();
  });
});

test('Check new-admin route', function(t) {
  var options = {
    method: 'GET',
    url: '/new-admin',
    credentials: {
      auth: 'goodtoken'
    }
  };
  server.inject(options, (res) => {
    t.equal(res.statusCode, 200, 'status code is 200');
    t.end();
  });
});

test('Check submit route', function(t) {
  var options = {
    method: 'POST',
    url: '/submit-admin',
    payload: sampleNewAdmin,
    credentials: {
      auth: 'goodtoken'
    }
  };
  server.inject(options, (res) => {
    t.equal(res.statusCode, 200, 'status code is 200');
    t.end();
  });
});
