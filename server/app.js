var express = require('express'),
    middle  = require('./middleware'),
    helpers = require('./helpers');

var app = express();

// placeholder for testing deployment
app.get('/', function(req, res, next) {
  helpers.sendMessage('Hello, world', process.env.TEST_PHONE);
  res.send(200, 'hello world :-)');
});

require('./config.js')(app, express);

module.exports = exports = app;
