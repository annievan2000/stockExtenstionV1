$(document).ready(function(){
    $("#searchGoogle").click(function(){
        $("#myForm").submit(); // Submit the form
    });
});
// in the file onButtonsClicked, the chart that gets displayed changes as well as
// the little circle changes colors depending on which button is clicked
//Perhaps we should swap our parts of allTickerAxes when tickers are switched.
xLabels = []
yLabels = []
for (var j=0; j < 5; j++){
    xLen = allTickerAxes[j].x.length; // You can probably take this out of the for loop because all the arrays have the same time ticks.
    xlong = allTickerAxes[j].x;
    currentXLabels = []
    for (var i = 0; i < xLen;i++){
        currentXLabels.push(xlong[i].substring(11, 16));    //This step is purely text processing.
    }
    xLabels.push(currentXLabels)
    yLabels.push(allTickerAxes[j].y)
}

// This part sets the literal title of each button in javascript
document.getElementById('getCanvas').innerHTML= localStorage["ticker1"];
document.getElementById('getCanvas2').innerHTML = localStorage["ticker2"];
document.getElementById('getCanvas3').innerHTML= localStorage["ticker3"];
document.getElementById('getCanvas4').innerHTML = localStorage["ticker4"];
document.getElementById('getCanvas5').innerHTML = localStorage["ticker5"];

// getCanvas, getCanvas2 etc are the id's of the buttons. The code below just
// sets them as vars to use in javascript

var elem1 = document.getElementById('getCanvas');
var elem2 = document.getElementById('getCanvas2');
var elem3 = document.getElementById('getCanvas3');
var elem4 = document.getElementById('getCanvas4');
var elem5 = document.getElementById('getCanvas5');
var popup = document.getElementById('statsPopupIcon');

function updateButtonNames(){
  elem1.innerHTML= localStorage["ticker1"];
  elem2.innerHTML= localStorage["ticker2"];
  elem3.innerHTML= localStorage["ticker3"];
  elem4.innerHTML= localStorage["ticker4"];
  elem5.innerHTML= localStorage["ticker5"];
}
function updateFundamentalTable(ticker){
    var params = {'symbol' : ticker, "apiKey" : localStorage["alphaVantage"]}
    $.ajax({
        url: 'http://173.255.223.120/fundamentals',
        data: params,
        beforeSend: function() { $('#wait').toggle(); },
        complete: function() { $('#wait').toggle(); },
        success: function(data){
            // Return the two arrays
            keys = data[0]
            vals = data[1]
            $('#fundamentalsTable').empty();
            for (i = 0; i < 6; i = i + 6){
              // the code for the first 6 cells are different because its top border is set to 0
              // tiny detail that effects css style
              $('#fundamentalsTable').append($('<tr><td class = "topRow">' + keys[i].bold() + '</td><td class = "topRow">' + vals[i] + '</td><td class = "topRow" >' + keys[i+1].bold() + '</td><td class = "topRow">' + vals[i+1] + '</td><td class = "topRow">' + keys[i+2].bold() + '</td><td class = "topRow">' + vals[i+2] + '</td><td class = "topRow">' + keys[i+3].bold() + '</td><td class = "topRow">' + vals[i+3] + '</td><td class = "topRow">' + keys[i+4].bold() + '</td><td class = "topRow">' + vals[i+4] + '</td><td class = "topRow">' + keys[i+5].bold() + '</td><td class = "topRow">' + vals[i+5] + '</td></tr>'));

              for (i = 6; i < 72; i = i + 6){
                $('#fundamentalsTable').append($('<tr><td>' + keys[i].bold() + '</td><td>' + vals[i] + '</td><td>' + keys[i+1].bold() + '</td><td>' + vals[i+1] + '</td><td>' + keys[i+2].bold() + '</td><td>' + vals[i+2] + '</td><td>' + keys[i+3].bold() + '</td><td>' + vals[i+3] + '</td><td>' + keys[i+4].bold() + '</td><td>' + vals[i+4] + '</td><td>' + keys[i+5].bold() + '</td><td>' + vals[i+5] + '</td></tr>'));
              }
            }
            $("#fundamentalsTable").css("margin-bottom", "0px");
            $(".topRow").css("border-top", "0px");
            $("#fundamentalsTable").toggle();   // Show the new table.
        }//,
        //async: false
    });
}

$('#arrowIcon').click(function(){
        if (localStorage['tempFundamental'] != localStorage['activeTicker']){
            localStorage['tempFundamental']= localStorage['activeTicker'];
            $("#fundamentalsTable").toggle();
            updateFundamentalTable(localStorage[localStorage['activeTicker']]);
        }
});
// Hover Event for arrow icon.

$(document.getElementById('arrowIcon')).hover(function(){
        document.getElementById('arrowIcon').style.color = "lightblue";
},
function(){
    document.getElementById('arrowIcon').style.color = "black";
});



function switch_current_ticker(tickerNum){ //This should take in a string out of ["ticker1", "ticker2", "ticker3", "ticker4", "ticker5"]
    localStorage['activeTicker'] = tickerNum;
    document.getElementById("modalTickerName").innerHTML = localStorage[localStorage['activeTicker']];
    var allFundamentals = JSON.parse(localStorage.getItem("allFundamentals"));
    var info = allFundamentals[tickerNum]
    var stockExShort = info.stock_exchange_short;
    var symbol = info.symbol;
    var prices = info.price;
    var currency = info.currency;
    var dayChange = info.day_change;
    var changePct = info.change_pct;
    var lastTime = info.last_trade_time;
    var timeZone = info.timezone;
    var open = info.price_open;
    var prevClose = info.close_yesterday;
    var high = info.day_high;
    var low = info.day_low;
    var volume = info.volume;
    var marketCap = info.close_yesterday;
    var sharesOut = info.shares;
    var t52high = info["52_week_high"]
    var t52low = info["52_week_low"];

 // ================= Handles the ticker Panel heading info ===============
    var tickerName = document.getElementById("tickerName");
    tickerName.innerHTML = stockExShort + ": " + symbol;
    var tickerPrice = document.getElementById('tickerPrice');
    tickerPrice.innerHTML = prices;
    tickerPrice.style.fontWeight = "bold";
    var tickerPercentages = document.getElementById('tickerPercentages');
    tickerPercentages.innerHTML = dayChange + " (" + changePct + "%)";
    // checks whether to make color red or green
    if ( dayChange.charAt(0) === "-"){
      tickerPercentages.style.color = "red";
      var trendColor = 'rgba(255, 0, 0)';
    }
    else{
      tickerPercentages.style.color = "green";
      var trendColor = 'rgba(0, 128, 0)';
    }
    // end of the if-statement that color coordinates things
    var tickerClosing = document.getElementById('tickerClosing');
    tickerClosing.innerHTML = "Closed: " + lastTime + " " + timeZone;

// =================== Swap out Charts ==========================
    $('#canvasContainer').remove();
    $('#canvas').append('<canvas id = "canvasContainer"><canvas>');
    index = Number(tickerNum.slice(-1)) -1;
    currentX = xLabels[index];
    var xLabelsShort = [];
        // this loop gets only the time of each date instead of displaying long date and time
        for (var i = 0; i < xlenT1; i++){
          xLabelsShort.push(currentX[i].substring(11,16));
        }
    currentY = yLabels[index];

    const ctx = document.getElementById('canvasContainer').getContext('2d');
        ctx.canvas.width = 150;
        ctx.canvas.height = 50;

        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: xLabelsShort,
                datasets: [{
                    label: 'CLOSE ',
                    data: currentY,
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    borderColor: trendColor,
                    borderWidth: 2,
                    minRotation: 0,
                    maxRotation: 0
                }]
            },
            options: {
              title: {
                display: true,
                text: localStorage[tickerNum],
              },
                scales: {
                  xAxes: [{
            ticks: {
              autoSkip: true,
              maxTicksLimit: 5,
              callback: function(dataLabel, index){
                // if its not equal to 0, display date
                // if its every fifth value, display date
                return (index !== 0) ? dataLabel : '';
              },
              maxRotation: 0,
              minRotation: 0
                    },
                    gridLines: {
                      display: false,
                      drawBorder: true,
                      drawOnChartArea: true
                    }
                  }],
                    yAxes: [{
                        ticks: {
                            beginAtZero: false
                        },
                        gridLines: {
                          display: true,
                          drawBorder: true,
                          drawOnChartArea: true
                        },
                    }]
                },
                responsive: true,
                maintainAspectRatio: true,
                display: false,
                legend: {
                display: false
             },
             tooltips: {
                enabled: true
             },
             elements: {
               point: {
                 radius: 0
               }
             }
            }

        });

}

elem1.addEventListener('click', function(event){
      // manually change colors of the little buttons
      document.getElementById('circle1').style.backgroundColor= "#bbbbbb";
      document.getElementById('circle2').style.backgroundColor= "#bbbbbb00";
      document.getElementById('circle3').style.backgroundColor= "#bbbbbb00";
      document.getElementById('circle4').style.backgroundColor= "#bbbbbb00";
      document.getElementById('circle5').style.backgroundColor= "#bbbbbb00";
      switch_current_ticker("ticker1")
          // Code to change the table.
          //updateFundamentalTable(localStorage["ticker1"])
});

elem2.addEventListener('click', function(event){
      document.getElementById('circle1').style.backgroundColor= "#bbbbbb00";
      document.getElementById('circle2').style.backgroundColor= "#bbbbbb";
      document.getElementById('circle3').style.backgroundColor= "#bbbbbb00";
      document.getElementById('circle4').style.backgroundColor= "#bbbbbb00";
      document.getElementById('circle5').style.backgroundColor= "#bbbbbb00";
      switch_current_ticker("ticker2")
          // Code to change the table.
          //updateFundamentalTable(localStorage["ticker2"])
});

elem3.addEventListener('click', function(event){
  document.getElementById('circle1').style.backgroundColor= "#bbbbbb00";
      document.getElementById('circle2').style.backgroundColor= "#bbbbbb00";
      document.getElementById('circle3').style.backgroundColor= "#bbbbbb";
      document.getElementById('circle4').style.backgroundColor= "#bbbbbb00";
      document.getElementById('circle5').style.backgroundColor= "#bbbbbb00";
      switch_current_ticker("ticker3")
          // Code to change the table.
          //updateFundamentalTable(localStorage["ticker3"])
});

elem4.addEventListener('click', function(event){
      document.getElementById('circle1').style.backgroundColor= "#bbbbbb00";
      document.getElementById('circle2').style.backgroundColor= "#bbbbbb00";
      document.getElementById('circle3').style.backgroundColor= "#bbbbbb00";
      document.getElementById('circle4').style.backgroundColor= "#bbbbbb";
      document.getElementById('circle5').style.backgroundColor= "#bbbbbb00";
      switch_current_ticker("ticker4")
          // Code to change the table.
          //updateFundamentalTable(localStorage["ticker4"])
});

elem5.addEventListener('click', function(event){
      document.getElementById('circle1').style.backgroundColor= "#bbbbbb00";
      document.getElementById('circle2').style.backgroundColor= "#bbbbbb00";
      document.getElementById('circle3').style.backgroundColor= "#bbbbbb00";
      document.getElementById('circle4').style.backgroundColor= "#bbbbbb00";
      document.getElementById('circle5').style.backgroundColor= "#bbbbbb";
      switch_current_ticker("ticker5")
          // Code to change the table.
          //updateFundamentalTable(localStorage["ticker5"])
});
