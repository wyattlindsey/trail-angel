'use strict';

var express = require('express');
var controller = require('./api/controller/controller.js');

module.exports = function(app) {

  // app.use('/api/users', require('./api/route/index.js'));
  // app.use('/api/trailfaves', require('./api/route/index.js'));

  app.delete('/api/users/:id', controller.users.delete);
  app.post('/api/users', controller.users.post);

  app.get('/api/trailfaves/user/:id', controller.trailfaves.get);
  app.delete('/api/trailfaves/:id', controller.trailfaves.delete);
  app.post('/api/trailfaves/:id', controller.trailfaves.post);

  app.route('/*')
    .get(function(req, res) {
      res.sendStatus(404);
    });

};