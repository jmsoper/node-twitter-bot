var http = require('http');


var urlBase = 'http://aws_example_url.com:3000/';

function holidayFetcher(date){
  var url = urlBase + date;
  http.get(url, function(error, response){
    var statusCode = response.statusCode;
    var contentType = response.headers['content-type'];

    errorHandling(response);

    response.setEncoding('utf8');
    var rawData = '';
    response.on('data', function(chunk){
     rawData += chunk });
    response.on('end', function(){
      try {
        var parsedData = JSON.parse(rawData);
        console.log(parsedData);
      } catch function(e){
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
  } else if (!/^application\/json/.test(contentType)) {
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
