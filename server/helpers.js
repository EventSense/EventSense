var request = require('request');

exports.sendMessage = function(message, number){
  var text = {
    from: 'EventSense',
    to: number,
    text: message,
  }
  request.post('https://rest.nexmo.com/sms/json',{
    body: text
  })
}