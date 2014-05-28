var express = require('express'),
    middle  = require('./middleware'),
    helpers = require('./helpers');

var app = express();

// placeholder for testing deployment
app.get('/', function(req, res, next) {
  res.send(200,'^-^');
});

// placeholder for testing deployment
app.get('/', function(req, res, next) {
  res.send(200, '^_^'); 
});

app.get('/twitter/mentions',function(req, res, next){
  helpers.getMentions(req, res);
})

app.get('/nexmo', function(req, res, next){
  helpers.callWit(req,res, function(data){
    helpers.sendMessage(data);
  });
  res.send(200);
});

require('./config.js')(app, express);

module.exports = exports = app;
