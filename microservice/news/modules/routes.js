const express = require('express');
const router = express.Router();
const JWT = require('./jwt');
const controller = require('./controller');

router.get('/news/:emiten', JWT.verify, controller.getNews);

module.exports = router;