var request = require('request');
var Twitter = require('twit');
var sentiment = require('sentiment');

// Set up twitter authentication
var T = new Twitter({
    consumer_key:         process.env.CONSUMER_KEY,
    consumer_secret:      process.env.CONSUMER_SECRET, 
    access_token:         process.env.ACCESS_TOKEN_KEY,
    access_token_secret:  process.env.ACCESS_TOKEN_SECRET
});

// Set options
var thresholds = {
  high: 5,
  low: -3
}

// Track relevant data
var scores = {
  totalScore: 0,
  compositeScore: 0,
  count: 0
}

// Select stream
var stream = T.stream('user', {track: 'APIRXR'});

// Watch Twitter stream
stream.on('tweet', function(tweet){
  // Get tweet sentiment score
  var tweetScore = sentiment(tweet.text).score;
  
  // Average the tweet score into sentiment compositeScore
  scores.count++;
  scores.totalScore += tweetScore;
  scores.compositeScore = scores.totalScore / scores.count;

  // If tweet score exceeds thresholds, take action
  if(tweetScore > thresholds.high){
    retweet(tweet);
  } else if(tweetScore < thresholds.low){
    postTweet('Hey @' + tweet.user.screen_name + '!  That wasn\'t very nice!')
  }

  // Call Wit.AI to determine if the tweet should be responded to
  callWit(tweet);
});

function retweet(tweet){
  T.post('statuses/retweet/' + tweet.id);
}

function postTweet(message){
  T.post('statuses/update', {status: message}, function(err, data, res){
    if(err) return console.error(err);
    console.log('Tweet sent!', data);
  })
}

function callWit(tweet){
  // Wit authentication
  var headers = {
    Authorization: 'Bearer ' + process.env.WITAI_KEY,
  };

  // Set WitAI http request headers
  var options = {
    url: 'https://api.wit.ai/message',
    headers: headers,
    form: {q: tweet.text, v: '20140528'}
  };

  // Send http request to Wit.AI to process for intent
  request.get(options, function(err, dummyVariable, body){
    if(err) return console.error(err);
    body = JSON.parse(body);
    var intent = body.outcome.intent;
    if(intent === 'eventSummary'){
      twitter.postTweet('@' + tweet.user.screen_name + ' Current average sentiment score is ' + scores.compositeScore + '.');
    }
  });
};
