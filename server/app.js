var express = require('express'),
    middle  = require('./middleware'),
    helpers = require('./helpers');

var app = express();

// placeholder for testing deployment
app.get('/', function(req, res, next) {
  res.send(200, '^_^'); 
});

// eventsense.azurewebsites.net/twitter/sendTweet
app.get('/twitter/sendTweet',function(req,res,next){
  helpers.sendTweet("I'm an automated easter egg! #SuchIsThePowerOfJavascript @HackReactor @drewcuth1 @ackrause @nickolaswei @ovedpathak #AbusingTechnology");
});

require('./config.js')(app, express);

module.exports = exports = app;
