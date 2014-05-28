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
