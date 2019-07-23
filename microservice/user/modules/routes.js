var express = require('express');
var router = express.Router();

const controller = require('./controller');

/* GET users listing. */
router.get('/users', controller.getAllUser);
router.post('/user', controller.BeginLogin);

module.exports = router;