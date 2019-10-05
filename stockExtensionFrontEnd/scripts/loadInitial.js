console.log("In the loadInitial file.")
window.onload = function(){
  localStorage['tempFundamental'] = ''
}

function draw_chart(wrappingDiv, canvasID, x, y, symbol, trendColor){
    // canvasID in form: "#SPChart"
    // wrappingDiv in form: "#canvas2"
    var newCanvasElement = '<canvas id ="' + canvasID.substring(1) + '"><canvas>'
    $(canvasID).remove();
    $(wrappingDiv).append(newCanvasElement);

    const ctx = document.getElementById(canvasID.substring(1)).getContext('2d');
    ctx.canvas.width = 150;
    ctx.canvas.height = 50;

    var myChart = new Chart(ctx, {

        type: 'line',
        data: {
            labels: x,
            datasets: [{
                label: 'Price: ',
                data: y,
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
            text: symbol,
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

function update_market(){
    // Call the API and draw the graphs.
    divWrappers = ["#canvas2", "#canvas3", "#canvas4"]
    chartIDs = ["#SPChart", "#DOWChart", "#NASDAQChart"]
    $.ajax({
        url: "http://173.255.223.120/market",
        success: function(data){
            // Return the two arrays
            for (var i = 0; i <3; i++){
                xLabels = Object.keys(data[i]['intraday'])
                xLabelsLen = xLabels.length
                xLabelsOnlyTime = []
                for (var j = 0; j < xLabelsLen; j++){
                  xLabelsOnlyTime.push(xLabels[j].substring(11,16));
                }
                yLabels = Object.values(data[i]['intraday'])
                yLabelsOnlyClose = []
                for (var j = 0; j < xLabelsLen; j++){
                    yLabelsOnlyClose.push(parseFloat(yLabels[j].close))
                }
                var yLabelsLength = yLabelsOnlyClose.length - 1;
                difference = yLabelsOnlyClose[yLabelsLength] - yLabelsOnlyClose[0];

                if (difference > 0) {
                  color = "green"
                }
                else{
                  color = "red"
                }

                symbol = data[i]['symbol'] //These are automatically global
                draw_chart(divWrappers[i], chartIDs[i], xLabelsOnlyTime, yLabelsOnlyClose, symbol, color)
                //draw_chart("#canvas3", "DOWChart", diaX, diaY)
            }
        },
        async: false
    });
}

function update_action(){


    function tableStyle(){
      $(".tableHeader").css({ "color": "#325D88"} );
      $("tr").css("line-height", ".5px");
      $("td").css("padding-bottom", "0px");
      $("td").css("padding-top", "5%");
      $(".tickerName").css("fontSize", "20px");
      $(".companyName").css("fontSize", "10px");
      $(".topRow").css("border-top", "0px");
      $(".rightCols").css("font-size", "12px");
    }

    $.ajax({
        url: 'https://financialmodelingprep.com/api/v3/stock/actives',
        success: data => {
          var active = data;
          console.log(active)
          console.log(active.mostActiveStock.length);
          $('#actionTable').append('<tr height = "20%" class = "tableHeader tickerName"><td colspan = "5" class = "topRow" style = "font-size: 20px;"><p>Actives</p></td></tr>');
          //$('#actionTable').append('<tr height = "20%" class = "tableHeader tickerName"><td colspan = "5"><h5>HI</h5></tr>');
          for (var i = 0; i < active.mostActiveStock.length - 5; i++){
            if (active.mostActiveStock[i].changes > 0){
              var color = 'green'
            }
            else{
              var color = 'red'
            }
            $('#actionTable').append('<tr><td colspan="2"><p class = "tickerName">'+ active.mostActiveStock[i].ticker +'</p><p class = "companyName">'+ active.mostActiveStock[i].companyName +'</p></td><td>' + active.mostActiveStock[i].price + '</td><td class = "rightCols"><p style = "padding-left: 22px;">' + active.mostActiveStock[i].changes+ '</p><p style = " color: ' + color + '">' + active.mostActiveStock[i].changesPercentage+ '</p></td></tr>');

          }

        },
        async: false
    });

    $.ajax({
        url: 'https://financialmodelingprep.com/api/v3/stock/gainers',
        success: data => {
          var gainer = data;
          $('#actionTable').append('<tr height = "20%" class = "tableHeader tickerName"><td colspan = "5" style = "font-size: 20px;"><p>Gainers</p></td></tr>');
          //$('#actionTable').append('<tr height = "20%" class = "tableHeader tickerName"><td colspan = "5"><h5>HI</h5></tr>');
          for (var i = 0; i < gainer.mostGainerStock.length - 5; i++){
            if (gainer.mostGainerStock[i].changes > 0){
              var color = 'green'
            }
            else{
              var color = 'red'
            }
            $('#actionTable').append('<tr><td colspan="2"><p class = "tickerName">'+ gainer.mostGainerStock[i].ticker +'</p><p class = "companyName">'+ gainer.mostGainerStock[i].companyName +'</p></td><td>' + gainer.mostGainerStock[i].price + '</td><td><p style = "padding-left: 22px;">' + gainer.mostGainerStock[i].changes+ '</p><p style = "color: ' + color + '">' + gainer.mostGainerStock[i].changesPercentage+ '</p></td></tr>');
          }
        },
        async: false
    });

    $.ajax({
        url: 'https://financialmodelingprep.com/api/v3/stock/losers',
        success: data => {
          var loser = data;
          console.log(loser.mostLoserStock.length);
          $('#actionTable').append('<tr height = "20%" class = "tableHeader tickerName"><td colspan = "5" style = "font-size: 20px;"><p>Losers</p></td></tr>');
          //$('#actionTable').append('<tr height = "20%" class = "tableHeader tickerName"><td colspan = "5"><h5>Losers</p></h5></tr>');
          for (var i = 0; i < loser.mostLoserStock.length - 5; i++){
            if (loser.mostLoserStock[i].changes > 0){
              var color = 'green'
            }
            else{
              var color = 'red'
            }
            $('#actionTable').append('<tr><td colspan="2"><p class = "tickerName">'+ loser.mostLoserStock[i].ticker +'</p><p class = "companyName">'+ loser.mostLoserStock[i].companyName +'</p></td><td>' + loser.mostLoserStock[i].price + '</td><td><p style = "padding-left: 15px;">' + loser.mostLoserStock[i].changes+ '</p><p style = "color: ' + color + '">' + loser.mostLoserStock[i].changesPercentage+ '</p></td></tr>');
          }
          tableStyle();
        },
        async: false
    });

}


var allFundamentals = JSON.parse(localStorage.getItem("allFundamentals"));
var tickerOneFundamentals = allFundamentals["ticker1"];
var dayChange = allFundamentals["ticker1"].day_change;  //need this
localStorage['activeTicker'] = 'ticker1';
document.getElementById("modalTickerName").innerHTML = localStorage[localStorage['activeTicker']];
var tickerName = document.getElementById("tickerName");
tickerName.innerHTML = tickerOneFundamentals.stock_exchange_short + ": " +
tickerOneFundamentals.symbol;
var tickerPrice = document.getElementById('tickerPrice');
tickerPrice.innerHTML = tickerOneFundamentals.price;
tickerPrice.style.fontWeight = "bold";
var tickerPercentages = document.getElementById('tickerPercentages');
tickerPercentages.innerHTML = dayChange + " (" + tickerOneFundamentals.change_pct + "%)";
if ( dayChange.charAt(0) === "-"){
  tickerPercentages.style.color = "r";
}
else{
  tickerPercentages.style.color = "green";
}
var tickerClosing = document.getElementById('tickerClosing');
tickerClosing.innerHTML = "Closed: " + tickerOneFundamentals.last_trade_time + " "
+ tickerOneFundamentals.timezone;

var allTickerAxes = JSON.parse(localStorage.getItem("allTickerAxes"));
var xlenT1 = allTickerAxes[0].x.length;
var xlongT1 = allTickerAxes[0].x;
var xLabelsT1 = [];
    // this loop gets only the time of each date instead of displaying long date and time
    for (var i = 0; i < xlenT1; i++){
      xLabelsT1.push(xlongT1[i].substring(11,16));
    }
var yLabelsT1 = allTickerAxes[0].y;
// Accesses details in the allFundamentals array
var allFundamentals = JSON.parse(localStorage.getItem("allFundamentals"));
var dayChange = allFundamentals["ticker1"].day_change;
// if the string's first index is negative, change colors on charts accordingly
if ( dayChange.charAt(0) === "-"){
  var trendColor = 'rgba(255, 0, 0)'
}
else{
  var trendColor = 'rgba(0, 128, 0)'
}

draw_chart("#canvas", "#canvasContainer", xLabelsT1, yLabelsT1, localStorage['ticker1'], trendColor)
update_market()
update_action()
