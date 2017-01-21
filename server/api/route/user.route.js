var express = require('express');
var userController = require('../controller/user.controller.js');

var router = express.Router();

router.delete('/:id', userController.delete);
router.post('/', userController.post);

module.exports = router;