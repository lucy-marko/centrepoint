"use strict";

const hapi = require('hapi');
const handlebars = require('handlebars');
const inert = require('inert');
const vision = require('vision');
const routes = require('./routes/index.js');
const fs = require('fs');
const path = require('path');

const server = new hapi.Server();

server.connection ({
  port: process.env.PORT || 9443
});

server.register([inert, vision], (err) => {
  if (err) throw err;

  server.views({
    engines: {
      html: handlebars
    },
    path: 'views',
    layoutPath: 'views/layout',
    layout: 'default',
    partialsPath: 'views/partials'
  });

  server.route(routes);

});

module.exports = server;
