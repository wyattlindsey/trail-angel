'use strict';

var express = require('express');
var controller = require('./api/controller/controller.js');

module.exports = function(app) {

app.use('/api/users', require('./api/route/user.route.js'));
app.use('/api/trailfaves', require('./api/route/trailfaves.route.js'));

app.route('/*')
  .get(function(req, res) {
    res.sendStatus(404);
  });

};