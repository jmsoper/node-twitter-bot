var http = require('http');

var urlBase = 'http://ec2-54-209-46-6.compute-1.amazonaws.com';

function holidayFetcher(date, tweetFunc){
  var url = urlBase + date;
  http.get(url, function(response){
    console.log("Fetching holiday");
    console.log(response);
    var statusCode = response.statusCode;
    var contentType = response.headers['content-type'];

    var statusCode = response.statusCode;
    var contentType = response.headers['content-type'];
    var parsedData;

    errorHandling(response);

    response.setEncoding('utf8');
    var rawData = '';
    response.on('data', function(chunk){
     rawData += chunk });
    response.on('end', function(){
      try {
        parsedData = JSON.parse(rawData);
        if (parsedData.isAHoliday){
          console.log("Today is a holiday -- proceeding with tweet.");
          tweetFunc(parsedData);
        }
      } catch (e){
        console.log(e.message);
      }
    });
  }).on('error', function(e){
    console.log(`Got error: ${e.message}`);
  });
}




function errorHandling(response){
  var statusCode = response.statusCode;
  var contentType = response.headers['content-type'];

  if (statusCode !== 200) {
    error = new Error(`Request Failed.\n` +
                      `Status Code: ${statusCode}`);
  }
  else if (!/^application\/json/.test(contentType)) {
    error = new Error(`Invalid content-type.\n` +
                      `Expected application/json but received ${contentType}`);
  }

  if (error) {
    console.log(error.message);
    // consume response data to free up memory
    response.resume();
    return;
  }
}


module.exports = holidayFetcher;
