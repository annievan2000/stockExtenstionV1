var currMonthTracker = moment().month() + 1;
var currYearTracker = moment().year();
var todaysDate = new Date().getDate();
var currMon= moment().month() + 1;
var nextMon = currMon + 1;
var currYear = moment().year();
//console.log("this is the current year" + currYear);
var monthName = moment(currMon, 'MM').format('MMMM');

//var monthName = moment().format('MMMM');
document.getElementById("grid-name").innerHTML = monthName + " " + currYear;
var firstDay = new Date(currMon +' 1,  '+ currYear +' 23:15:30');
var date = firstDay.getDay();
spacesSkipped();
totalDays();

function spacesSkipped(){
    if (date === 1){
      $('#grid-container').append($('<div class="grid-item">'));
    }

    if (date === 2){
      $('#grid-container').append($('<div class="grid-item">'));
      $('#grid-container').append($('<div class="grid-item">'));
    }

    if (date ==3){
      $('#grid-container').append($('<div class="grid-item">'));
      $('#grid-container').append($('<div class="grid-item">'));
      $('#grid-container').append($('<div class="grid-item">'));
    }

    if (date ==4){
      $('#grid-container').append($('<div class="grid-item">'));
      $('#grid-container').append($('<div class="grid-item">'));
      $('#grid-container').append($('<div class="grid-item">'));
      $('#grid-container').append($('<div class="grid-item">'));
    }

    if (date ==5){
      $('#grid-container').append($('<div class="grid-item">'));
      $('#grid-container').append($('<div class="grid-item">'));
      $('#grid-container').append($('<div class="grid-item">'));
      $('#grid-container').append($('<div class="grid-item">'));
      $('#grid-container').append($('<div class="grid-item">'));
    }

    if (date ==6){
      $('#grid-container').append($('<div class="grid-item">'));
      $('#grid-container').append($('<div class="grid-item">'));
      $('#grid-container').append($('<div class="grid-item">'));
      $('#grid-container').append($('<div class="grid-item">'));
      $('#grid-container').append($('<div class="grid-item">'));
      $('#grid-container').append($('<div class="grid-item">'));
    }
}

function totalDays(){
    if (currMon== 1 || currMon== 3 || currMon== 5 || currMon== 7 || currMon== 8 || currMon== 10 || currMon== 12){
      $('#grid-container').append($('<div class="grid-item">1</div>'));
      $('#grid-container').append($('<div class="grid-item">2</div>'));
      $('#grid-container').append($('<div class="grid-item">3</div>'));
      $('#grid-container').append($('<div class="grid-item">4</div>'));
      $('#grid-container').append($('<div class="grid-item">5</div>'));
      $('#grid-container').append($('<div class="grid-item">6</div>'));
      $('#grid-container').append($('<div class="grid-item">7</div>'));
      $('#grid-container').append($('<div class="grid-item">8</div>'));
      $('#grid-container').append($('<div class="grid-item">9</div>'));
      $('#grid-container').append($('<div class="grid-item">10</div>'));
      $('#grid-container').append($('<div class="grid-item">11</div>'));
      $('#grid-container').append($('<div class="grid-item">12</div>'));
      $('#grid-container').append($('<div class="grid-item">13</div>'));
      $('#grid-container').append($('<div class="grid-item">14</div>'));
      $('#grid-container').append($('<div class="grid-item">15</div>'));
      $('#grid-container').append($('<div class="grid-item">16</div>'));
      $('#grid-container').append($('<div class="grid-item">17</div>'));
      $('#grid-container').append($('<div class="grid-item">18</div>'));
      $('#grid-container').append($('<div class="grid-item">19</div>'));
      $('#grid-container').append($('<div class="grid-item">20</div>'));
      $('#grid-container').append($('<div class="grid-item">21</div>'));
      $('#grid-container').append($('<div class="grid-item">22</div>'));
      $('#grid-container').append($('<div class="grid-item">23</div>'));
      $('#grid-container').append($('<div class="grid-item">24</div>'));
      $('#grid-container').append($('<div class="grid-item">25</div>'));
      $('#grid-container').append($('<div class="grid-item">26</div>'));
      $('#grid-container').append($('<div class="grid-item">27</div>'));
      $('#grid-container').append($('<div class="grid-item">28</div>'));
      $('#grid-container').append($('<div class="grid-item">29</div>'));
      $('#grid-container').append($('<div class="grid-item">30</div>'));
      $('#grid-container').append($('<div class="grid-item">31</div>'));
      $('#grid-container').append($('<div class="grid-item">'));
      $('#grid-container').append($('<div class="grid-item">'));
    }
    if (currMon== 2){
      $('#grid-container').append($('<div class="grid-item">1</div>'));
      $('#grid-container').append($('<div class="grid-item">2</div>'));
      $('#grid-container').append($('<div class="grid-item">3</div>'));
      $('#grid-container').append($('<div class="grid-item">4</div>'));
      $('#grid-container').append($('<div class="grid-item">5</div>'));
      $('#grid-container').append($('<div class="grid-item">6</div>'));
      $('#grid-container').append($('<div class="grid-item">7</div>'));
      $('#grid-container').append($('<div class="grid-item">8</div>'));
      $('#grid-container').append($('<div class="grid-item">9</div>'));
      $('#grid-container').append($('<div class="grid-item">10</div>'));
      $('#grid-container').append($('<div class="grid-item">11</div>'));
      $('#grid-container').append($('<div class="grid-item">12</div>'));
      $('#grid-container').append($('<div class="grid-item">13</div>'));
      $('#grid-container').append($('<div class="grid-item">14</div>'));
      $('#grid-container').append($('<div class="grid-item">15</div>'));
      $('#grid-container').append($('<div class="grid-item">16</div>'));
      $('#grid-container').append($('<div class="grid-item">17</div>'));
      $('#grid-container').append($('<div class="grid-item">18</div>'));
      $('#grid-container').append($('<div class="grid-item">19</div>'));
      $('#grid-container').append($('<div class="grid-item">20</div>'));
      $('#grid-container').append($('<div class="grid-item">21</div>'));
      $('#grid-container').append($('<div class="grid-item">22</div>'));
      $('#grid-container').append($('<div class="grid-item">23</div>'));
      $('#grid-container').append($('<div class="grid-item">24</div>'));
      $('#grid-container').append($('<div class="grid-item">25</div>'));
      $('#grid-container').append($('<div class="grid-item">26</div>'));
      $('#grid-container').append($('<div class="grid-item">27</div>'));
      $('#grid-container').append($('<div class="grid-item">28</div>'));
      $('#grid-container').append($('<div class="grid-item">'));
      $('#grid-container').append($('<div class="grid-item">'));
    }
    if (currMon== 4 || currMon== 6 || currMon== 9 || currMon== 11){
      $('#grid-container').append($('<div class="grid-item">1</div>'));
      $('#grid-container').append($('<div class="grid-item">2</div>'));
      $('#grid-container').append($('<div class="grid-item">3</div>'));
      $('#grid-container').append($('<div class="grid-item">4</div>'));
      $('#grid-container').append($('<div class="grid-item">5</div>'));
      $('#grid-container').append($('<div class="grid-item">6</div>'));
      $('#grid-container').append($('<div class="grid-item">7</div>'));
      $('#grid-container').append($('<div class="grid-item">8</div>'));
      $('#grid-container').append($('<div class="grid-item">9</div>'));
      $('#grid-container').append($('<div class="grid-item">10</div>'));
      $('#grid-container').append($('<div class="grid-item">11</div>'));
      $('#grid-container').append($('<div class="grid-item">12</div>'));
      $('#grid-container').append($('<div class="grid-item">13</div>'));
      $('#grid-container').append($('<div class="grid-item">14</div>'));
      $('#grid-container').append($('<div class="grid-item">15</div>'));
      $('#grid-container').append($('<div class="grid-item">16</div>'));
      $('#grid-container').append($('<div class="grid-item">17</div>'));
      $('#grid-container').append($('<div class="grid-item">18</div>'));
      $('#grid-container').append($('<div class="grid-item">19</div>'));
      $('#grid-container').append($('<div class="grid-item">20</div>'));
      $('#grid-container').append($('<div class="grid-item">21</div>'));
      $('#grid-container').append($('<div class="grid-item">22</div>'));
      $('#grid-container').append($('<div class="grid-item">23</div>'));
      $('#grid-container').append($('<div class="grid-item">24</div>'));
      $('#grid-container').append($('<div class="grid-item">25</div>'));
      $('#grid-container').append($('<div class="grid-item">26</div>'));
      $('#grid-container').append($('<div class="grid-item">27</div>'));
      $('#grid-container').append($('<div class="grid-item">28</div>'));
      $('#grid-container').append($('<div class="grid-item">29</div>'));
      $('#grid-container').append($('<div class="grid-item">30</div>'));
      $('#grid-container').append($('<div class="grid-item">'));
      $('#grid-container').append($('<div class="grid-item">'));
    }
}

function getCurrentDay(){
    if (currMon === currMonthTracker && currYear === currYearTracker){
      //console.log(document.getElementsByClassName('grid-item')[6].innerHTML);
      document.getElementsByClassName('grid-item')[todaysDate+date -1].style.fontWeight = "bold";
    }
}

document.getElementById("submitEvent").onclick = createEvent;
var getEvents = JSON.parse(localStorage.getItem("allEvents"));
var eventDays = [];
highlightEvent();
displayEventName();
var newDescriptions = [];
var newDays = [];
// returns a string of the objects in janurary's array
//console.log("event month" + getEvents["1"])

function createEvent() {
    var getEvents = JSON.parse(localStorage.getItem("allEvents"));

    var month = document.getElementById("submitMonth");
    var description = document.getElementById("submitDescription");
    var day = document.getElementById("submitDay");
    var year = document.getElementById("submitYear");
    var startTime = document.getElementById("submitStartTime");
    var endTime = document.getElementById("submitEndTime");

    var eventMonth = month.value;
    //console.log("type of month "  + typeof eventMonth)
    var newEvent = {
      "day": day.value,
       "year": year.value,
      "description" : description.value,
      "startTime" : startTime.value,
      "endTime" : endTime.value,
    };
    // made updates in getEvents
    getEvents[eventMonth].push(newEvent);
    getEvents[currMon].push(newEvent);

    var getNewEvent = getEvents[currMon];
    // last item
    var newEventLength = getEvents[currMon].length - 1;
    $('.grid-item').click(function(){
      var newInnerNumber = $(this).text();
      if (newInnerNumber === getNewEvent[newEventLength].day){
        // console.log(getNewEvent[newEventLength].description)
        $('#exampleModal').modal('show');
        $("#exampleModal .modal-title").text(getNewEvent[newEventLength].description);
        $("#exampleModal .interval").text(getNewEvent[newEventLength].startTime + " -" + getNewEvent[newEventLength].endTime);
      }
    });
    localStorage.setItem("allEvents", JSON.stringify(getEvents));
    document.getElementsByClassName('grid-item')[parseInt(day.value) + date - 1].style.color = "black";
    document.getElementsByClassName('grid-item')[parseInt(day.value) + date - 1].style.fontWeight = "bold";
    // push this object into the array of the corresonding month
}

function highlightEvent(){
    for (i = 0; i < getEvents[currMon].length; i++){
      var counter = i;
      var firstDay = new Date( currMon +' 1, '+ currYear +' 23:15:30');
      var date = firstDay.getDay();

      // this variable is supposed to keep track of the exact DAY
      eventDays.push(getEvents[currMon][i].day);

      document.getElementsByClassName('grid-item')[parseInt(getEvents[currMon][i].day) + date - 1].style.color = "black";
      document.getElementsByClassName('grid-item')[parseInt(getEvents[currMon][i].day) + date - 1].style.fontWeight = "bold";
    }
}

function displayEventName(){
    $('.grid-item').click(function(){
      var innerNumber = $(this).text();
      var indexNeeded = eventDays.indexOf(innerNumber);
      //console.log("this is indexNeeded "  + typeof indexNeeded)
      if (indexNeeded === -1){
        return;
      }
      if (getEvents[currMon][indexNeeded].description === undefined){
        console.log("undefined")
      }
      else{
          $('#exampleModal').modal('show');
          $("#exampleModal .modal-title").text(getEvents[currMon][indexNeeded].description);
          $("#exampleModal .interval").text(getEvents[currMon][indexNeeded].startTime + " -" + getEvents[currMon][indexNeeded].endTime);
      }
      //console.log("LOOK HERE" + indexNeeded)
      //console.log(getEvents[currMon][indexNeeded].description)
      document.getElementById("deleteButton").onclick = deleteIndex;

      function deleteIndex(){
        if (indexNeeded > -1) {
          getEvents[currMon].splice(indexNeeded, 1);
          localStorage.setItem("allEvents", JSON.stringify(getEvents));
        }
      }
    });
}

function delete_cal(){
    $( ".grid-item" ).remove();
}

function changeMonthForward(){
    delete_cal();
    currMon = currMon +1;

    // resets month to January
    if (currMon >= 13){
      currMon = 1;
      currYear = currYear + 1;
    }
    var monthName = moment(currMon, 'MM').format('MMMM');
    document.getElementById("grid-name").innerHTML = monthName + " " + currYear;
    //console.log("month name changes " + monthName)
    //console.log("this is curr Mon" + currMon);
    //console.log("this is the current year" + currYear);
    var firstDay = new Date(currMon +' 1,  '+ currYear +' 23:15:30');
    var date = firstDay.getDay();

    //console.log("this id the date " + date);
    spacesSkipped();
    totalDays();
    eventDays.length = 0;
    highlightEvent();
    displayEventName();
    getCurrentDay();
}

function changeMonthBackwards() {
    delete_cal();
    // the current month is 1 behind
    currMon = currMon - 1;

    // if it goes to zero (passing january), then reset to december and decrement 1 year
    if (currMon <= 0){
      currMon = 12;
      currYear = currYear - 1;
    }

    var monthName = moment(currMon, 'MM').format('MMMM');
    document.getElementById("grid-name").innerHTML = monthName + " " + currYear;
    //console.log("month name changes " + monthName);
    //console.log("this the previous month" + currMon);
    //console.log("this is the current year" + currYear);

    var firstDay = new Date(currMon +' 1,  '+ currYear +' 23:15:30');
    var date = firstDay.getDay();

    //console.log("this id the date " + date);
    spacesSkipped();
    totalDays();
    eventDays.length = 0;
    highlightEvent();
    displayEventName();
    getCurrentDay();
}
document.getElementById("prevMon").onclick = changeMonthBackwards;
document.getElementById("nextMon").onclick = changeMonthForward;
