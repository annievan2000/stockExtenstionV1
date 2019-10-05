// Show searchTickerDiv when the search icon is clicked.
$('#searchTickerIcon').click(function(){
    $("#submitTickerChange").css("display","block");
    $("#searchTickerDiv").toggle();
})

//document.getElementById('submitTickerChange').onclick = changeTicker;
allTickerSymbols = JSON.parse(localStorage.getItem('allSymbols'));
var userInput = document.getElementById('switchTickerInput');
$('#submitTickerChange').click(function(){
    console.log("Checking if the ticker that user wants to change to is valid.")
    if(allTickerSymbols.includes(userInput.value)){ console.log('This is a valid ticker'); changeTicker(); }
    else{ console.log('This is not a valid ticker'); //$("#switchTickerInput").css('border-bottom', 'solid 2px red');
    $( "#submitTickerChange" ).effect( "shake", {'distance': 5, 'times':2} )
    }
})

function changeTicker(){
    console.log("this is userInput.value " + userInput.value)
    activeTickerIndex = parseInt(localStorage['activeTicker'].slice(-1)) -1 //returns 1, 2, 3, 4 or 5
    localStorage[localStorage['activeTicker']] = userInput.value;
    updateButtonNames();
    let params = {'symbol': userInput.value, 'sort_by': 'list_order',
                  'api_token': localStorage["worldtradingData"]};
    $.ajax({
       // This changes the allFundamentals variable in localStorage
       url: "https://api.worldtradingdata.com/api/v1/stock",
       data: params,
       beforeSend: function(){
          $("#loadIcon").toggle();
          $("#submitTickerChange").toggle();
       },
       success: function(data){
           var tempFundamentals = JSON.parse(localStorage.getItem("allFundamentals"));
           //console.log(tempFundamentals)
           console.log(data['data'][0])
           console.log("The type of data['data'] is: ")
           console.log(typeof[data['data']])
           tempFundamentals[localStorage['activeTicker']] = data['data'][0];
           //console.log(tempFundamentals['ticker1'])
           localStorage.setItem("allFundamentals", JSON.stringify(tempFundamentals));
       },

    });

    $.ajax({
        url: 'http://173.255.223.120/data',
        data: {"function": "TIME_SERIES_INTRADAY", "symbol": userInput.value, "interval" : '5min', "apiKey": localStorage["alphaVantage"]},
        complete: function(){
            $("#loadIcon").toggle();
            $("#searchTickerDiv").toggle();
        },
        success: function(data){
          if (data["Time Series (5min)"] === undefined){
            alert("Please refresh the page & try again in 1 minute")
          }
            var currentX = Object.keys(data["Time Series (5min)"]);

            var dictArray = Object.values(data["Time Series (5min)"]);
            //For some reason, json["Time Series (5min)"] becomes undefined outside of this scope
            console.log(dictArray);
            var currentY = [];
            dictArray.forEach(function(dictionary) {
                // Extract the prices
                var price = dictionary["4. close"];
                currentY.push(parseFloat(price));
            });
            var trendColor = "green";
            xLabels[activeTickerIndex] = currentX //xLabels is found in onButtonsClicked.js
            yLabels[activeTickerIndex] = currentY
            console.log("These are the xLabels once updated. ====================")
            console.log(xLabels)
            console.log("These are the yLabels once updated. ====================")
            console.log(yLabels)
            switch_current_ticker(localStorage['activeTicker'])
        },
        error: function(jqXHR, textStatus, errorThrown) {
          alert("Status: " + jqXHR.status); alert("Error: " + jqXHR.responseText);
        }
    });

}
