var express = require('express');
var controller = require('../controller/geolocation.controller.js');

var router = express.Router();

//need userId for all api calls
router.get('/:trailId/:userId', controller.geolocation.get);
router.delete('/:trailId', controller.geolocation.delete);
router.post('/:trailId', controller.geolocation.post);
router.put('/:trailId', controller.geolocation.put);

// //get total distance with userId and trailId
// router.get('/:trailId', controller.geolocation.getDistance);
// router.get('/:trailId', controller.geolocation.getDistance2points);


module.exports = router;