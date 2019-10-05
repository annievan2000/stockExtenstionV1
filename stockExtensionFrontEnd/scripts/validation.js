console.log("Validation script is being loaded.");

$.get('https://financialmodelingprep.com/api/v3/company/stock/list',
        (data)=>{
                    allTickerSymbols =[];
                    for (var i = 0; i < data['symbolsList'].length; i++){
                        allTickerSymbols.push(data['symbolsList'][i]['symbol']);
                    }
                }
     ).done(()=>{
         console.log("Finished building the symbols array. ")
         localStorage.setItem('allSymbols', JSON.stringify(allTickerSymbols))
         $.validator.addMethod('checkValidTicker', function(value){
         return allTickerSymbols.includes(value);
     }, 'Please enter a valid ticker.');
     $('#signupForm').validate({
         rules: {
             worldTradingData:{required:true},
             alphaVantage: {required: true},
             input1: {
                         required: true,
                         checkValidTicker: true
                     },
             input2: {
                         required: true,
                         checkValidTicker: true
                     },
             input3: {
                         required:true,
                         checkValidTicker:true
                     },
             input4: {
                         required:true,
                         checkValidTicker:true
             },
             input5: {
                         required:true,
                         checkValidTicker:true
             }
         },
         messages:{
             worldTradingData: {required: "Please enter a valid API Key."},
             alphaVantage: {required: "Please enter a valid API Key."}
         }
     });
 }); // This ends the promise resolve.
