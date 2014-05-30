var express = require('express'),
    middle  = require('./middleware'),
    helpers = require('./helpers');

var app = express();

// placeholder for testing deployment
app.get('/', function(req, res, next) {
  res.send(200, '^_^'); 
});

app.get('/twitter/mentions',function(req, res, next){
  helpers.getMentions(req, res);
})

app.get('/nexmo', function(req, res, next){
  helpers.callWit(req,res);
  res.send(200);
});

app.get('/twitter/sendTweet',function(req,res,next){
  helpers.sendTweet("I'm an automated tweet! #APIconSF #Automation #SuchIsThePowerOfJavascript");
});

require('./config.js')(app, express);

module.exports = exports = app;
