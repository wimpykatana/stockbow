const express = require('express');
const router = express.Router();
const JWT = require('./jwt');

const controller = require('./controller');


router.post('/user', controller.BeginLogin);
router.get('/user/:id', JWT.verify, controller.getUser);

module.exports = router;