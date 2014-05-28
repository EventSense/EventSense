var express = require('express'),
    middle  = require('./middleware'),
    nexmo = require('easynexmo');

var app = express();
var nexmoRouter = express.Router();

nexmo.initialize(process.env.NEXMO_KEY, process.env.NEXMO_SECRET, 'http', false);
// placeholder for testing deployment
app.get('/', function(req, res, next) {
  res.send(200, 'hello world :-)');
});

nexmoRouter.route('/nexmo')

.get(function(req, res, next) {
  res.send(200, '^_^');
})

.post(function(req, res, next) {
  nexmo.sendTextMessage(process.env.NEXMO_PHONE, process.env.TEST_PHONE, "hello world");
});

require('./config.js')(app, express, {nexmoRouter: nexmoRouter});

module.exports = exports = app;
