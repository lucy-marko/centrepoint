"use strict";

const hapi = require('hapi');
const fs = require('fs');
const path = require('path');

const inert = require('inert');
const vision = require('vision');
const handlebars = require('handlebars');
const CookieAuth = require('hapi-auth-cookie');
const routes = require('./routes/index.js');
const deployStatus = process.env.NODE_ENV === 'PRODUCTION';

const server = new hapi.Server();

server.connection ({
  port: process.env.PORT || 9443,
  tls: {
    key: fs.readFileSync(path.join(__dirname, '../keys_tls/key.pem')),
    cert: fs.readFileSync(path.join(__dirname, '../keys_tls/cert.pem'))
  },
  router: {
    stripTrailingSlash: true
  }
});

server.register([inert, vision, CookieAuth], (err) => {
  if (err) throw err;
  server.views({
    engines: {
      html: handlebars
    },
    path: 'src/views',
    layoutPath: 'src/views/layout',
    layout: 'default',
    partialsPath: 'src/views/partials'
  });
  server.auth.strategy('base', 'cookie', options);
  server.route(routes);
});

const options = {
    password: 'D8M8#7PqdkRbb}/=NhvG#(B&/tA6v:unC2S',
    cookie: 'yoti-cookie',
    isSecure: deployStatus,
    ttl: 24 * 60 * 60 * 1000
};

module.exports = server;
