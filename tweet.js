var Twit = require('twit');
var keys = require('./secrets');

var client = new Twit({
  consumer_key:         keys.consumer_key,
  consumer_secret:      keys.consumer_secret,
  access_token:         keys.access_token,
  access_token_secret:  keys.access_token_secret,
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
})


function postTweet(status){
  client.post('statuses/update', { status: status}, function(err, data, response) {
    console.log(data)
  });
}

module.exports = postTweet;
