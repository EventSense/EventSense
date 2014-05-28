var express = require('express'),
    middle  = require('./middleware');

var app = express();
var nexmoRouter = express.Router();

// placeholder for testing deployment
app.get('/', function(req, res, next) {
  res.send(200, 'hello world :-)');
});

nexmoRouter.route('/nexmo')

.get(function(req, res, next) {
  res.send(200, '^_^');
})

.post(function(req, res, next) {
  // handle nexmo req
});

require('./config.js')(app, express, {nexmoRouter: nexmoRouter});

module.exports = exports = app;
