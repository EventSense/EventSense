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
  high: 4,
  low: -1
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
    postTweet('@' + tweet.user.screen_name + ' ' + randomComback(), tweet.id_str);
  }
  // Call Wit.AI to determine if the tweet should be responded to
  callWit(tweet);
});

function retweet(tweet){
  T.post('statuses/retweet/' + tweet.id_str, function(err, data, res) {
    if (err) return console.error(err);
  });
}

function postTweet(message, tweetId){
  T.post('statuses/update', {status: message, in_reply_to_status_id_str: tweetId, in_reply_to_status_id: tweetId}, function(err, data, res){
    if(err) return console.error(err);
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
      postTweet('@' + tweet.user.screen_name + ' Current average sentiment score is ' + scores.compositeScore + '.', tweet.id_str);
    }
  });
};

// Keep a few witty comebacks on hand, just in case...
var comebacks = [
  'That wasn\'t very nice!',
  'Your mother was a hamster and your father smelt of elderberries',
  'Methink\'st thou art a general offence and every man should beat thee',
  'Thou mammering milk-livered bum-bailey!',
  'I find the ass in compound with the major part of your syllables',
  'What a drunken knave was the sea to cast thee in our way!',
  'Come, come, you talk greasily; your lips grow foul.',
  'Go ahead, make my day.',
  'May the Force be with you',
  'Frankly, my dear, I don\'t give a damn.'
];

function randomComeback(){
  var random = Math.floor(Math.random() * comebacks.length)
  return comebacks[random];
}

module.exports = {postTweet: postTweet};