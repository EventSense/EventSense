var request = require('request');

exports.sendMessage = function(message, number){
  number = number || process.env.TEST_PHONE;
  var text = {
    api_key: process.env.NEXMO_KEY,
    api_secret: process.env.NEXMO_SECRET,
    from: process.env.NEXMO_PHONE,
    to: number,
    text: message,
  };
  
  request.post('https://rest.nexmo.com/sms/json',{
    form: text
  });
};

exports.callWit = function(req){
  var headers = {
    Authorization: 'Bearer ' + process.env.WITAI_KEY,
  };

  var options = {
    url: 'https://api.wit.ai/message',
    headers: headers,
    form: {q: req.query.text, v: '20140528'}
  };

  request.get(options, function(err, res, body){
    if(err) return console.error(err);
    var intent = body.outcome.intent;
    switch (intent) {
      case 'eventSummary':
        var startTime, endTime;
        if (outcome.entitites.datetime) {
          if (Array.isArray(outcome.entitites.datetime)) {
            startTime = outcome.entities.datetime[0].value.from;
            endTime = outcome.entities.datetime[1].value.from;
          } else {
            startTime = outcome.entities.datetime[0].value.from;
          }
        }
        getSummary(startTime, endTime);
        break;
      case 'bestFeedback':
        findLove();
        break;
      case 'worstIssue':
        findHate();
        break;
      case 'scheduleTweet':
        var time;
        if (outcome.entities.datetime) {
          time = outcome.entitites.datetime.value.from;
        }
        var message = outcome.entitites.message_body.value;
        scheduleTweet(time, message);
        break;
      default:
        console.log('oops');
    }
  });
};

var getSummary = function(startTime, endTime){
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
   sendTweet(tweet);
 }, wait);
};


var sentimentAnalysis = function(text){
 // returns sentiment score for one message
 return 666;
};

var analyzeTweets = function(tweets){
 // tweets is array with tweet objects
 // analyzeTweets iterates over all tweets, 
 // calling sentimentAnalysis on each,
 // then calculates average sentiment score
 return 666;
};

var retrieveTweets = function(startTime, endTime){
 // retrieve all tweets between startTime and endTime
 // default endTime is now
 // default startTime is 24 hours ago
 return 'tweets!';
};

var sendTweet = function(tweet){
 // post tweet...
 exports.sendMessage(tweet, process.env.TEST_PHONE);
};
