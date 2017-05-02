var express = require('express');
var supplyItemsController = require('../controller/supplyitems.controller.js');

var router = express.Router();

router.get('/user/:id', supplyItemsController.get);
router.delete('/:name', supplyItemsController.delete);
router.post('/:name', supplyItemsController.post);

module.exports = router;
