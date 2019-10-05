
if (!(localStorage.myName && localStorage.ticker1 && localStorage.ticker2 && localStorage.ticker3 && localStorage.ticker4 && localStorage.ticker5)){
  console.log("At least one LocalStorage Value DNE");
}
else {
  console.log("Successfully saved all LocalStorage Values");
  window.location.href = "../main.html";
}
