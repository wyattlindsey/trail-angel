
var express = require('express');
var controller = require('./user.controller');

var router = express.Router();

router.get('/api/users', controller.users.get);
router.delete('/api/users/:id', controller.users.delete);
router.post('/api/users', controller.users.post);
router.put('/api/users/:id', controller.users.put);

router.get('/api/trailfaves', controller.trailfaves.get);
router.delete('/api/trailfaves/:id', controller.trailfaves.delete);
router.post('/api/trailfaves/:id', controller.trailfaves.post);

module.exports = router;