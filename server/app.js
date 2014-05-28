var express = require('express'),
    middle  = require('./middleware');

var app = express();
var nexmoRouter = express.Router();

nexmoRouter.route('/nexmo')

.get(function(req, res, next) {
  res.send(200, '^_^');
})

.post(function(req, res, next) {
  // handle nexmo req
});

app.get('/', function(req, res, next) {
  res.send(200, 'hello world :-)');
});

require('./config.js')(app, express, {nexmoRouter: nexmoRouter});

module.exports = exports = app;
