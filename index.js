var tweet = require('./tweet');
var holidayFetcher = require('./holiday_fetcher');


//get the current date
var givenDate = new Date;

//format the date
var month = givenDate.getMonth();
var date = givenDate.getDate() - 1;
var today = month + "-" + date;

//check the current date against the calendar
var holidayMessage = holidayFetcher(today, tweet);

//process the returned response
var formattedText = 'hello world';

//if there is a holiday, tweet out the formatted holiday.
// if (holidayMessage.isAHoliday){
//   tweet(formattedText);
// }
