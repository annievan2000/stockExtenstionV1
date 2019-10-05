// updateAll.js reloads everything that needs to be reloaded at the correct Times.
// @4pm, update all market indices for marketPanel, update all tickers for tickerPanel, update all active/gainers/losers
var today = new Date();
var offset = today.getTimezoneOffset();
// current time in UTC
var currentTime = (today.getHours() * 3600000) + (today.getMinutes() * 60000) + (offset * 60000);
// ^ Adding hours to milliseconds and minutes to milliseconds

// since im working with UTC now, 6pm is equivalent to 1pm pacific
var every6PM = 46810000;    // every 4pm in milliseconds
var every24Hours = 86400000;
var countdown;
if (currentTime > every6PM){    // If it's passed 4pm ...
  countdown = every6PM + ( 86400000 - currentTime)
}
else {
  countdown = every6PM - currentTime;
}

var tickerArray = [localStorage['ticker1'],
                   localStorage['ticker2'],
                   localStorage['ticker3'],
                   localStorage['ticker4'],
                   localStorage['ticker5']]

function update_tickers(){
    // MAKE 5 ALPHAVANTAGE API CALLS AND DRAW CHARTS FOR ALL OF THEM.

    var firstTicker = document.getElementById('input1');
    var secondTicker = document.getElementById('input2');
    var thirdTicker = document.getElementById('input3');
    var fourthTicker = document.getElementById('input4');
    var fifthTicker = document.getElementById('input5');
    var arrayOne = createGetDataFunction(tickerArray[0]);
    var arrayTwo = createGetDataFunction(tickerArray[1]);
    var arrayThree = createGetDataFunction(tickerArray[2]);
    var arrayFour = createGetDataFunction(tickerArray[3]);
    var arrayFive = createGetDataFunction(tickerArray[4]);

    $.when(arrayOne(), arrayTwo(), arrayThree(), arrayFour(), arrayFive(), retrieve_fundamentals()).done((return1, return2, return3, return4, return5, return6)=>{
        // Place into allTickerAxes into localStorage
        //I'll have to update xLabels and yLabels gloabl variable here after everything is placed into local storage.
                // This is because switch_current_ticker grabs from this variable rather than local storage.
        console.log("Updating all of the tickers for the day.")
        allTickerAxes = [];
        [return1, return2, return3, return4, return5].forEach((data)=>{
            var xlabels = Object.keys(data[0]["Time Series (5min)"]);
            var dictArray = Object.values(data[0]["Time Series (5min)"]);
            var ylabels = [];

            dictArray.forEach(function(dictionary) {
                // Extract the prices
                var price = dictionary["4. close"];
                ylabels.push(parseFloat(price));
            }); //ends the dictionary parsing forEach
            var tickerAxes = {x: xlabels, y: ylabels}
            allTickerAxes.push(tickerAxes);
        }) //ends the return1, return2 ... forEach
        localStorage.setItem("allTickerAxes", JSON.stringify(allTickerAxes));
        xLabels = [];
        yLabels = [];
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

        var fundamentals = {};
        //console.log(data);
        arrayOfData = return6[0]['data'];
        var i;
        for(i = 0; i < 5; i++){
            fundamentals['ticker' +(i+1).toString()] = arrayOfData[i];
        }
        localStorage.setItem("allFundamentals", JSON.stringify(fundamentals));
        //parse the first one.
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
    });

}

console.log("Time left till the setTimeout executes  :: " + countdown);
setTimeout(function(){ console.log("It's 4:PM.");
                       update_market()
                       setInterval( function(){
                                        update_tickers();
                                        update_market();
                                        update_action();
                                    }, every24Hours)
                      }, countdown);
//updateMarket() function is from the file loadInitial.js
// And also update_action.

function createGetDataFunction(tickerNum){
    return function() {
        return $.get('http://173.255.223.120/data',
        {"function": "TIME_SERIES_INTRADAY", "symbol": tickerNum, "interval" : '5min', "apiKey": localStorage["alphaVantage"]},
        (data)=>{console.log("Just got the chart for this ticker: " + tickerNum);})
    }
}
function retrieve_fundamentals(){
    var fundamentalsDict = {};

    function build_symbol_arg(){
        symbolArg = '';
        tickerArray.forEach((ticker) => {
            symbolArg+=ticker+',';
        });
        return symbolArg;
    }
    symbol=build_symbol_arg();
    symbol=symbol.substring(0, symbol.length -1);
    //console.log(" this is symbol" + symbol);
    let params = {'symbol': symbol, 'sort_by': 'list_order',
                  'api_token': localStorage['worldTradingData'] };

    return $.get("https://api.worldtradingdata.com/api/v1/stock", params, (data) =>{console.log("Acomplished")})
}
