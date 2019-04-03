const express = require('express');
const path = require('path');
const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});

app.use(express.static(path.join(__dirname, 'htdocs')));

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'htdocs', 'index.html'));
});

const port = process.env.PORT || '1331';

app.listen(port);
console.log('web is up');
