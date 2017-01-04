'use strict';

var express = require('express');
var controller = require('./api/controller/controller.js');

module.exports = function(app) {

  // app.use('/api/users', require('./api/route/index.js'));
  // app.use('/api/trailfaves', require('./api/route/index.js'));

  app.delete('/api/users', controller.users.delete);
  app.post('/api/users', controller.users.post);

  app.get('/api/trailfaves/:id', controller.trailfaves.get);
  app.delete('/api/trailfaves', controller.trailfaves.delete);
  app.post('/api/trailfaves', controller.trailfaves.post);

  app.route('/*')
    .get(function(req, res) {
      res.sendStatus(404);
    });

};