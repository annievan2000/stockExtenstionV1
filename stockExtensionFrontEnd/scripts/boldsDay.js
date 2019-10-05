var todaysDate = new Date().getDate();
//console.log("the date is" + dd);

//how many blank spaces skipped
var currMon= moment().month() + 1;
var currYear = moment().year();
var firstDay = new Date( currMon +' 1, '+ currYear +' 23:15:30');
var date = firstDay.getDay();
//console.log("this is today's date" + date);

// this number is the current date, corresponding to the calendar position
//console.log("LOOK HERE" + document.getElementsByClassName('grid-item')[dd +date -1].innerHTML);

document.getElementsByClassName('grid-item')[todaysDate +date -1].style.fontWeight = "bold";
