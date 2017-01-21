const morgan = require('morgan');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
require('./mysql.server');
require('./redis.server');
require('./api/model/model.js');
const request = require('request');


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//request handlers
require('./routes')(app);

const port = process.env.PORT || 4000;
app.listen(port);

console.log('Listening on port: ', port);

module.exports = app;