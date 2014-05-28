var request = require('request');
var oauth = require('oauth');
var sentiment = require('sentiment');

var oauth = new oauth.OAuth(
  'https://api.twitter.com/oauth/request_token',
  'https://api.twitter.com/oauth/access_token',
  process.env.CONSUMER_KEY,
  process.env.CONSUMER_SECRET,
  '1.0A',
  null,
  'HMAC-SHA1'
);

setInterval(function() {
  exports.getMentions();
}, 30000);

exports.getMentions = function(req, res, callback){
  callback = callback || analyzeTweets;
  oauth.get(
    'https://api.twitter.com/1.1/statuses/mentions_timeline.json?count=800',
    process.env.ACCESS_TOKEN_KEY, //test user token
    process.env.ACCESS_TOKEN_SECRET, //test user secret            
    function (e, data, res){
      if (e) return console.error(e);
      callback(data);
      // res.send(200,'tweets obtained!')
    });    
}

exports.sendMessage = function(message, number){
  console.log('sending message!')
  number = number || process.env.TEST_PHONE;
  var text = {
    api_key: process.env.NEXMO_KEY,
    api_secret: process.env.NEXMO_SECRET,
    from: process.env.NEXMO_PHONE,
    to: number,
    text: message
  };
  
  request.post('https://rest.nexmo.com/sms/json',{
    form: text
  },function(err,data){
    if(err) return console.error(err);
    console.log('DATA!',data.body);
  });
};

exports.callWit = function(req, res){
  var headers = {
    Authorization: 'Bearer ' + process.env.WITAI_KEY,
  };

  console.log(req.query.text);

  var options = {
    url: 'https://api.wit.ai/message',
    headers: headers,
    form: {q: req.query.text, v: '20140528'}
  };

  request.get(options, function(err, dummyVariable, body){
    if(err) return console.error(err);
    body = JSON.parse(body);
    var intent = body.outcome.intent;
    console.log(intent);
    switch (intent) {
      case 'eventSummary':
        // var startTime, endTime;
        // if (body.outcome.entities.datetime) {
        //   if (Array.isArray(body.outcome.entities.datetime)) {
        //     startTime = body.outcome.entities.datetime[0].value.from;
        //     endTime = body.outcome.entities.datetime[1].value.from;
        //   } else {
        //     startTime = body.outcome.entities.datetime[0].value.from;
        //   }
        // }
        exports.getMentions(req, res, function(tweets) {
          var score = analyzeTweets(tweets);
          console.log(score);
          exports.sendMessage('Your self-worth is: ' + score + ' ^ _ ^ ');
        });
        break;
      case 'bestFeedback':
      console.log('bestFeedback');
        findLove();
        break;
      case 'worstIssue':
      console.log('worstIssue');
        findHate();
        break;
      case 'scheduleTweet':
      console.log('scheduleTweet');
        var time;
        if (body.outcome.entities.datetime) {
          time = body.outcome.entities.datetime.value.from;
        }
        var message = body.outcome.entities.message_body.value;
        scheduleTweet(time, message);
        break;
      default:
        console.log('oops');
    }
  });
};

var getSummary = function(startTime, endTime){
  retrieve
  var tweets = retrieveTweets(startTime, endTime);
  var compositeScore = analyzeTweets(tweets);
  exports.sendMessage('The average attendee rates this event at ' + compositeScore + '.');
};

var findLove = function(){
 exports.sendMessage(app.get('love').pop().tweet, process.env.TEST_PHONE);
};

var findHate = function(){
 exports.sendMessage(app.get('hate').pop().tweet, process.env.TEST_PHONE);
};


var scheduleTweet = function(time, tweet){
 if(!time){
   time = new Date();
 }
 var tweetAt = new Date(time);
 var now = new Date();
 var wait = tweetAt - now;
 setTimeout(function(){
   exports.sendTweet(tweet);
 }, wait);
};


var sentimentAnalysis = function(text){
 // returns sentiment score for one message
 return sentiment(text).score;
};

var loveThreshold = 5;
var hateThreshold = -5;
var love = [];
var hate = [];

var analyzeTweets = function(tweets){
  // tweets is array with tweet objects
  // analyzeTweets iterates over all tweets, 
  tweets = JSON.parse(tweets);
  compositeScore = 0;
  for (var i = 0; i < tweets.length; i++){
    // calling sentimentAnalysis on each,
    var score = sentimentAnalysis(tweets[i].text);
    if(score > loveThreshold){
      // add to love
      love.push(tweets[i]);
      // retweet
      retweet(tweets[i].id_str);
    } else if(score < hateThreshold){
      // add to hate
      hate.push(tweets[i]);
      // text to organizer
      setTimeout(function(){exports.sendMessage(tweets[i].text)},1000*i);
    }
    compositeScore += score;
  }
  compositeScore /= i;
  // then calculates average sentiment score

  return compositeScore;
};

var retweet = function(tweet){
  console.log('retweeting', tweet);
  oauth.post(
    'https://api.twitter.com/1.1/statuses/retweet/' + tweet + '.json',
    process.env.ACCESS_TOKEN_KEY, //test user token
    process.env.ACCESS_TOKEN_SECRET, //test user secret
    null,
    null,
    function (e, data,res){
      console.log('callaback!')
      if (e) return console.error(e);
    });
}

var retrieveTweets = function(req, res, callback){
  callback = callback || analyzeTweets;
  oauth.get(
    'https://api.twitter.com/1.1/statuses/mentions_timeline.json?count=800',
    process.env.ACCESS_TOKEN_KEY, //test user token
    process.env.ACCESS_TOKEN_SECRET, //test user secret            
    function (e, data, res){
      if (e) return console.error(e);
      callback(data);
      // res.send(200,'tweets obtained!')
    });    
};

exports.sendTweet = function(tweet){
 // post tweet...
  oauth.post(
    'https://api.twitter.com/1.1/statuses/update.json',
    process.env.ACCESS_TOKEN_KEY, //test user token
    process.env.ACCESS_TOKEN_SECRET, //test user secret
    {status:tweet},
    'text/html',
    function (e, data,res){
      if (e) return console.error(e);
    });
};
