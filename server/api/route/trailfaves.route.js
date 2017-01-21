
var express = require('express');
var trailfavesController = require('../controller/trailfaves.controller.js');

var router = express.Router();

router.get('/user/:id', trailfavesController.get);
router.delete('/:id', trailfavesController.delete);
router.post('/:id', trailfavesController.post);

module.exports = router;