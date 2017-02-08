"use strict";

const Hapi = require('hapi');
const inert = require('inert');
const vision = require('vision');
const routes = require('./routes/index.js');
const server = new Hapi.Server();

server.connection ({
  port: process.env.PORT || 9443
});

server.register([inert, vision], (err) => {
  if (err) throw err;
});

server.route(routes);

module.exports = server;
