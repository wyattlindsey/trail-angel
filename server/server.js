const morgan = require('morgan');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//request handlers


app.listen(4000);

console.log('Listening on localhost:4000');

module.exports = app;