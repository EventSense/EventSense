var request = require('request');

exports.sendMessage = function(message, number){
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

exports.callWit = function(req, res, callback){
  var headers = {
    Authorization: 'Bearer ' + process.env.WITAI,
    Accept: 'application/vnd.wit.20140401'
  };

  var options = {
    url: 'https://api.wit.ai/message',
    headers: headers,
    form: {q: req.query.text}
  };

  request.get(options, function(err, res, body){
    if(err) return console.error(err);
    callback(body);
  });
}