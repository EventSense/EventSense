var express = require('express'),
    middle  = require('./middleware'),
    helpers = require('./helpers');

var app = express();

// placeholder for testing deployment
app.get('/', function(req, res, next) {
  res.send(200, 'hello world :-)');
});

app.get('/nexmo', function(req, res, next){
  helpers.callWit(req,res, function(data){
    helpers.sendMessage(data, process.env.TEST_PHONE);
  });
  res.send(200);
})

require('./config.js')(app, express);

module.exports = exports = app;
