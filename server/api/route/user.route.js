var express = require('express');
var controller = require('../controller/user.controller.js');

var router = express.Router();

router.delete('/:id', controller.users.delete);
router.post('/', controller.users.post);

module.exports = router;