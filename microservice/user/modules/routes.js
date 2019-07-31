const express = require('express');
const router = express.Router();
const JWT = require('./jwt');

const controller = require('./controller');

router.post('/user', controller.beginLogin);
router.get('/user/:id', JWT.verify, controller.getUser);

module.exports = router;