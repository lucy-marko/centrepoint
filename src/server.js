"use strict";

const hapi = require('hapi');
const handlebars = require('handlebars');
const inert = require('inert');
const vision = require('vision');
const routes = require('./routes/index.js');
const YotiClient = require('yoti-node-sdk');
const fs = require('fs');
const path = require('path');

const server = new hapi.Server();

const CLIENT_SDK_ID = '8a4dcb2a-9ed6-4d44-9a55-12b581bb5e64';
const PEM = fs.readFileSync(path.join(__dirname, '../keys/help-access-security.pem'));
const yotiClient = new YotiClient(CLIENT_SDK_ID, PEM);

const tls = {
  key: fs.readFileSync(path.join(__dirname, '../keys/key.pem')),
  cert: fs.readFileSync(path.join(__dirname, '../keys/cert.pem'))
};

server.connection ({
  port: process.env.PORT || 9443,
  tls: tls
});

server.register([inert, vision], (err) => {
  if (err) throw err;

  server.views({
    engines: {
      html: handlebars
    },
    path: 'views',
    layoutPath: 'views/layout',
    layout: 'default'
  });

  server.route(routes);

});

module.exports = server;
