const morgan = require('morgan');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

const config = require('./config/environment');

require('./mysql.server');
require('./redis.server');
require('./api/model/model.js');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//request handlers
require('./routes')(app);

app.listen(config.PORT);

console.log('Listening on port: ', config.PORT);

module.exports = app;