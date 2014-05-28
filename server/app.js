var express = require('express'),
    middle  = require('./middleware'),
    helpers = require('./helpers');

var app = express();
var nexmoRouter = express.Router();

nexmo.initialize(process.env.NEXMO_KEY, process.env.NEXMO_SECRET, 'http', false);
// placeholder for testing deployment
app.get('/', function(req, res, next) {
  helpers.sendMessage('Hello, world', process.env.TEST_PHONE);
  res.send(200, 'hello world :-)');
});

.get(function(req, res, next) {
  res.send(200, '^_^');
})

.post(function(req, res, next) {
  // handle nexmo req

});

require('./config.js')(app, express, {nexmoRouter: nexmoRouter});

module.exports = exports = app;
