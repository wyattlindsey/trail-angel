const morgan = require('morgan');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
require('./mysql.server');
require('./redis.server');
require('./api/model/model.js');
// const request = require('request');


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//request handlers
require('./routes')(app);

// //delete request redis
// var body = {
//   userId: 45
// };
// request({
//   method: "DELETE",
//   uri: 'http://localhost:4000/api/geolocation/strawberry-peak',
//   json: body
//  }, function(err, response, body) {
//   console.log("successful", body);
//   console.log("something went wrong with api call ========", err);
//  });

//  //patch request redis this does not work quite yet
// var body = {
//   userId: 45,
//   pins: [[12, 32]]
// };
// request({
//   method: "PATCH",
//   uri: 'http://localhost:4000/api/geolocation/strawberry-peak',
//   json: body
//  }, function(err, response, body) {
//   console.log("successful", body);
//   console.log("something went wrong with api call ========", err);
//  });

// //update request redis
// var body = {
//   userId: 45,
//   pins: [[10.36138945817947388, 35.11555675070676585], [11.36138945817947388, 35.11554914654329451], [11.36138945817947388, 32.11555710591724022]]
// };
// request({
//   method: "PUT",
//   uri: 'http://localhost:4000/api/geolocation/strawberry-peak',
//   json: body
//  }, function(err, response, body) {
//   console.log("successful", body);
//   console.log("something went wrong with api call ========", err);
//  });


//post request redis (how to add to database in the correct order)
// var body = {
//   userId: 45,
//   pins: [[11.36138945817947388, 35.11554914654329451], [11.36138945817947388, 35.11555675070676585], [11.36138945817947388, 32.11555710591724022]]
// };
// request({
//   method: "POST",
//   uri: 'http://localhost:4000/api/geolocation/strawberry-peak',
//   json: body
//  }, function(err, response, body) {
//   console.log("successful", body);
//   console.log("something went wrong with api call ========", err);
 // });

//get request redis
// var body = {
//   userId: 45
// };
// request({
//   method: "GET",
//   uri: 'http://localhost:4000/api/geolocations/strawberry-peak',
//   json: body
//  }, function(err, response, body) {
//   console.log("successful", body);
//   console.log("something went wrong with api call ========", err);
//  });


// request.get('http://localhost:4000/api/geolocation/shoreline-trails:45', function(err, res, body) {
//   console.log("successful", body);
//   console.log("something went wrong with api call ========", err);

// });

app.listen(4000);

console.log('Listening on localhost:4000');

module.exports = app;