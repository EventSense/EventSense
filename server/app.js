var express = require('express'),
    middle  = require('./middleware'),
    helpers = require('./helpers'),
    twitter = require('twitter'),
    util = require('util');

var app = express();

var twit = new twitter({
    consumer_key: '1JztYZMouVMMrz4Pz9rm2cpVc',
    consumer_secret: 'Qwsdg3MORoo04iOYW7E1If7q6QaJv3XaSOXI4HF2Kfn1gaAwOo',
    access_token_key: '2529341916-1rrpieD1tFO0qKdkcfDGLeRoTaS3ZeXH0k0cxPf',
    access_token_secret: '1s5Mr2XhHs1Y4H3ZtMbol5VeC7a8oEmpTF2DwQ0nvoCQW'
});


// placeholder for testing deployment
app.get('/', function(req, res, next) {
  twit.search('#superbowl', function(data) {
    // console.log(util.inspect(data));
    res.send(200, data); 
  });
});

app.get('/nexmo', function(req, res, next){
  helpers.callWit(req);
  res.send(200);
});

require('./config.js')(app, express);

module.exports = exports = app;
