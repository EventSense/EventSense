var express = require('express'),
    middle  = require('./middleware'),
    helpers = require('./helpers');

var app = express();

// placeholder for testing deployment
app.get('/', function(req, res, next) {
  res.send(200,'^-^');
});

app.get('/nexmo', function(req, res, next){
  helpers.callWit(req);
  res.send(200);
});

require('./config.js')(app, express);

module.exports = exports = app;
