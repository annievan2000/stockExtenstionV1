var myNameMsg = document.getElementById('nameMsg');
var myName = document.getElementById('usr');
var myNameForm = document.getElementById('nameForm');
var worldTradingData = document.getElementById('worldTradingData');
var alphaVantage = document.getElementById('alphaVantage');

var firstTicker = document.getElementById('input1');
var secondTicker = document.getElementById('input2');
var thirdTicker = document.getElementById('input3');
var fourthTicker = document.getElementById('input4');
var fifthTicker = document.getElementById('input5');

var tickerArray = [];
var fundamentalsArray = [];

function log_info(){
    localStorage["myName"] = myName.value;

    localStorage["ticker1"] = firstTicker.value;
    tickerArray.push(firstTicker.value);
    localStorage["ticker2"] = secondTicker.value;
    tickerArray.push(secondTicker.value);
    localStorage["ticker3"] = thirdTicker.value;
    tickerArray.push(thirdTicker.value);
    localStorage["ticker4"] = fourthTicker.value;
    tickerArray.push(fourthTicker.value);
    localStorage["ticker5"] = fifthTicker.value;
    tickerArray.push(fifthTicker.value);
    localStorage["worldTradingData"] = worldTradingData.value;
    localStorage["alphaVantage"] = alphaVantage.value;
    // Send these to the server
    var userInfo = {"name" : myName.value,
                    "tickers" : tickerArray};

    var allEvents = {
      "1" : [],
      "2" : [],
      "3" : [],
      "4" : [],
      "5" : [],
      "6" : [],
      "7" : [],
      "8" : [],
      "9" : [],
      "10" : [],
      "11" : [],
      "12" : []
    }

    localStorage.setItem("allEvents", JSON.stringify(allEvents));
}

function multiple(){
    $('#spinner').toggle();
    $('#screen').toggle();
    log_info();
    var arrayOne = createGetDataFunction(tickerArray[0]);
    var arrayTwo = createGetDataFunction(tickerArray[1]);
    var arrayThree = createGetDataFunction(tickerArray[2]);
    var arrayFour = createGetDataFunction(tickerArray[3]);
    var arrayFive = createGetDataFunction(tickerArray[4]);
    //console.log('Doing a bunch of ajax calls now.');
    $.when(arrayOne(), arrayTwo(), arrayThree(), arrayFour(), arrayFive(), retrieve_fundamentals()).done((return1, return2, return3, return4, return5, return6)=>{
        // Place into allTickerAxes into localStorage
        console.log("Got here. ")
        allTickerAxes = [];
        //chartData = [return1, return2, return3, return4, return5];
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

        var fundamentals = {};
        //console.log(data);
        arrayOfData = return6[0]['data'];
        var i;
        for(i = 0; i < 5; i++){
            fundamentals['ticker' +(i+1).toString()] = arrayOfData[i];
        }
        localStorage.setItem("allFundamentals", JSON.stringify(fundamentals));
        change_HTML();

    }) // ENDS THE DONE PROMISE
} //ENDS THE MULTIPLE FUNCTION

// simply saves input as local storage and displays greeting

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
                  'api_token': worldTradingData.value };

    return $.get("https://api.worldtradingdata.com/api/v1/stock", params, (data) =>{console.log("Acomplished")})
}


document.getElementById('submitName').onclick = multiple;
// on click

function createGetDataFunction(tickerNum){
    return function() {
        return $.get('http://173.255.223.120/data',
        {"function": "TIME_SERIES_INTRADAY", "symbol": tickerNum, "interval" : '5min', "apiKey": localStorage["alphaVantage"]},
        (data)=>{console.log("Just got the chart for this ticker: " + tickerNum);})
    }
}

function getFundamentals(){
    let params = {'symbol': symbol, 'sort_by': 'list_order',
                  'api_token': worldTradingData.value };
    return $.get("https://api.worldtradingdata.com/api/v1/stock", params, (data) =>{console.log("Accomplished")})
}

function change_HTML(){
  //window.location.href = "goHere.html";
  //console.log("Changing html pages now.");
  window.location.href = "main.html";
}
