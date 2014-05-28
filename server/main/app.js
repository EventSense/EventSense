"use strict";

var express = require('express'),
    middle  = require('../main/middleware');

var app = express();
var nexmoRouter = express.Router();

require('./config.js')(app, express, {nexmoRouter: nexmoRouter});

nexmoRouter.route('/nexmo')

.get(function(req, res, next) {
  res.send(200, '^_^');
})

.post(function(req, res, next) {
  // handle nexmo req
});

module.exports = exports = app;
