function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class NavigationBox extends React.Component {
  render() {
    return React.createElement("li", {
      class: "nav-item"
    }, React.createElement("a", {
      onClick: this.props.updateActive.bind(this, this.props.indexName),
      class: "nav-link",
      href: "#"
    }, " ", this.props.indexName));
  } // ENDS RENDER FUNCTION


} // ENDS NAVIGATIONBOX CLASS


class NavigationContainer extends React.Component {
  render() {
    const navBoxes = [//<li class="nav-item">
      //  <a class="nav-link" href='#'>Home</a>
      //</li>
    ];
    const navButtonList = ["Home", "Shares", "Forex", "Crypto"];
    navButtonList.forEach(word => {
      navBoxes.push(React.createElement(NavigationBox, {
        indexName: word,
        updateActive: this.props.updateActive
      }));
    });
    return React.createElement("ul", {
      class: "navbar-nav"
    }, navBoxes.map(box => React.createElement("span", null, " ", box, " "))); // ENDS THE RETURN
  } // ENDS THE RENDER FUNCTION


} //ENDS THE NAVIGATIONCONTAINER CLASS


class IndexBox extends React.Component {
  //This takes care of all updating values.
  render() {
    return React.createElement("span", {
      class: "col",
      style: {
        padding: '10px',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '12px'
      }
    }, " ", this.props.indexName, " : ", this.props.indexPrice, " ");
  }

}

class ForexContainer extends React.Component {
  //this needs a bunch of boxes
  constructor(props) {
    super(props);
    this.forexList = ['EUR/USD', 'USD/CAD', 'USD/JPY', 'GBP/USD', 'AUD/USD'];
    this.url = "https://financialmodelingprep.com/api/v3/forex";
    this.oneArray = [];
    $.ajax({
      url: this.url,
      success: data => {
        console.log("Setting initial values for forex.");
        let x = data['forexList'];
        this.state = {
          valDict: {
            'EUR/USD': x[0]['bid'],
            'USD/CAD': x[7]['bid'],
            'USD/JPY': x[1]['bid'],
            'GBP/USD': x[2]['bid'],
            'AUD/USD': x[8]['bid']
          }
        };
        this.oneArray = [];
        this.forexList.forEach(name => {
          this.oneArray.push(React.createElement(IndexBox, {
            indexName: name,
            indexPrice: this.state.valDict[name]
          }));
        });
      },
      async: false
    });
  } // ENDS THE CONSTRUCTOR


  componentDidMount() {
    console.log('Component Mounted');
    this.interval = setInterval(() => {
      $.ajax({
        url: this.url,
        success: data => {
          console.log('gothere');
          let x = data['forexList'];
          this.setState({
            valDict: {
              'EUR/USD': x[0]['bid'],
              'USD/CAD': x[7]['bid'],
              'USD/JPY': x[1]['bid'],
              'GBP/USD': x[2]['bid'],
              'AUD/USD': x[8]['bid']
            }
          });
          this.oneArray = [];
          this.forexList.forEach(name => {
            this.oneArray.push(React.createElement(IndexBox, {
              indexName: name,
              indexPrice: this.state.valDict[name]
            }));
          });
        }
      } //This closes ajax params
      );
    }, 10 * 1000);
  } //end of componentDidMount


  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return this.oneArray;
  }

} // END OF FOREXCONTAINER CLASS


class CryptoContainer extends React.Component {
  //this needs a bunch of boxes
  constructor(props) {
    super(props);
    this.cryptoList = ['BTC', 'ETH', 'XRP', 'BCH', 'EOS'];
    this.url = "https://financialmodelingprep.com/api/v3/cryptocurrencies"; //this.oneArray = [ ]

    $.ajax({
      url: this.url,
      success: data => {
        console.log("Setting initial values.");
        let x = data['cryptocurrenciesList'];
        this.state = {
          valDict: {
            'BTC': x[0]['price'],
            'ETH': x[1]['price'],
            'XRP': x[2]['price'],
            'BCH': x[3]['price'],
            'EOS': x[4]['price']
          }
        };
        this.oneArray = [];
        this.cryptoList.forEach(name => {
          this.oneArray.push(React.createElement(IndexBox, {
            indexName: name,
            indexPrice: this.state.valDict[name]
          }));
        });
      },
      async: false
    });
  } // ENDS THE CONSTRUCTOR


  componentDidMount() {
    console.log('Component Mounted, starting updates every 60 seconds.');
    this.interval = setInterval(() => {
      $.ajax({
        url: this.url,
        success: data => {
          console.log('In update');
          let x = data['cryptocurrenciesList'];
          this.setState({
            valDict: {
              'BTC': x[0]['price'],
              'ETH': x[1]['price'],
              'XRP': x[2]['price'],
              'BCH': x[3]['price'],
              'EOS': x[4]['price']
            }
          });
          this.oneArray = [];
          this.cryptoList.forEach(name => {
            this.oneArray.push(React.createElement(IndexBox, {
              indexName: name,
              indexPrice: this.state.valDict[name]
            }));
          });
        }
      } //This closes ajax params
      );
    }, 10 * 1000);
  } //end of componentDidMount


  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return this.oneArray;
  }

} // END OF FOREXCONTAINER CLASS


class MarketContainer extends React.Component {
  //this needs a bunch of boxes
  constructor(props) {
    super(props);
    this.marketList = ['DJIA', 'S&P', 'NASDAQ', 'RUSSELL', 'PHX G/S'];
    this.url = 'https://financialmodelingprep.com/api/v3/majors-indexes'; //this.oneArray = [ ]

    $.ajax({
      url: this.url,
      success: data => {
        console.log("Setting initial values for the market.");
        let x = data['majorIndexesList'];
        this.state = {
          valDict: {
            'DJIA': x[0]['price'],
            'S&P': x[1]['price'],
            'NASDAQ': x[2]['price'],
            'RUSSELL': x[4]['price'],
            'PHX G/S': x[14]['price']
          }
        };
        this.oneArray = [];
        this.marketList.forEach(name => {
          this.oneArray.push(React.createElement(IndexBox, {
            indexName: name,
            indexPrice: this.state.valDict[name]
          }));
        });
      },
      async: false
    });
  } // ENDS THE CONSTRUCTOR


  componentDidMount() {
    console.log('Component Mounted');
    this.interval = setInterval(() => {
      $.ajax({
        url: this.url,
        success: data => {
          console.log('gothere');
          let x = data['majorIndexesList'];
          this.setState({
            valDict: {
              'DJIA': x[0]['price'],
              'S&P': x[1]['price'],
              'NASDAQ': x[2]['price'],
              'RUSSELL': x[4]['price'],
              'PHX G/S': x[14]['price']
            }
          });
          this.oneArray = [];
          console.log("This should print and values should show. ");
          this.marketList.forEach(name => {
            this.oneArray.push(React.createElement(IndexBox, {
              indexName: name,
              indexPrice: this.state.valDict[name]
            }));
          });
        }
      } //This closes ajax params
      );
    }, 10 * 1000);
  } //end of componentDidMount


  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return this.oneArray;
  }

} // END OF FOREXCONTAINER CLASS


class IndexContainer extends React.Component {
  //this.props.whichActive will tell indexContainer which to display
  constructor(props) {
    super(props);
  }

  render() {
    //conditional render
    if (this.props.whichActive == 'Shares') {
      return React.createElement(MarketContainer, null);
    } else if (this.props.whichActive == "Home") {
      return React.createElement("div", null);
    } else if (this.props.whichActive == "Forex") {
      return React.createElement(ForexContainer, null);
    } else if (this.props.whichActive == "Crypto") {
      return React.createElement(CryptoContainer, null);
    }
  } // ENDS THE RENDER FUNCTION


} // ENDS THE INDEXCONTAINER CLASS


class EntireBar extends React.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      whichActive: "Home"
    });

    _defineProperty(this, "updateActive", indexName => {
      if (indexName !== this.state.whichActive) {
        this.setState({
          whichActive: indexName
        }, () => {
          // Do something here.
          console.log(this.state.whichActive);
        }); //ends the setState function
      }
    });
  }

  render() {
    return React.createElement("nav", {
      class: "navbar navbar-dark navbar-expand-lg bg-primary justify-content-between"
    }, React.createElement("div", {
      class: "container-fluid"
    }, React.createElement("a", {
      class: "navbar-brand",
      href: "#"
    }, "WALL ST."), React.createElement("div", {
      class: "navbar-collapse collapse dual-nav w-50 order-1 order-md-0"
    }, React.createElement(NavigationContainer, {
      updateActive: this.updateActive
    })), React.createElement("div", {
      class: "container mx-auto d-block text-center justify-content-between"
    }, React.createElement("div", {
      class: "row"
    }, React.createElement(IndexContainer, {
      whichActive: this.state.whichActive
    }))), React.createElement("div", {
      class: "navbar-collapse collapse w-50 order-2"
    }, React.createElement("form", {
      id: "myForm",
      class: "form-inline my-2 my-lg-0 nav-item ml-auto",
      action: "https://www.google.com/search",
      method: "GET"
    }, React.createElement("input", {
      class: "form-control mr-sm-2",
      type: "text",
      name: "q",
      style: {
        marginBottom: '5px',
        color: 'white',
        paddingLeft: '0px',
        fontSize: '15px',
        borderLeft: '0px',
        width: '175px',
        borderRight: '0px',
        borderTop: '0px',
        borderBottom: 'solid 2px white',
        borderRadius: '0px',
        background: 'transparent',
        height: '25px'
      },
      placeholder: "Search"
    }), React.createElement("i", {
      id: "searchGoogle",
      class: "fas fa-search",
      "aria-hidden": "true",
      style: {
        color: 'white'
      }
    })))));
  }

}

ReactDOM.render(React.createElement(EntireBar, null), document.getElementById('navbarDiv'));
