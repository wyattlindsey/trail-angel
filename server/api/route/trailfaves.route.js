
var express = require('express');
var controller = require('../controller/trailfaves.controller.js');

var router = express.Router();

router.get('/user/:id', controller.trailfaves.get);
router.delete('/:id', controller.trailfaves.delete);
router.post('/:id', controller.trailfaves.post);

module.exports = router;