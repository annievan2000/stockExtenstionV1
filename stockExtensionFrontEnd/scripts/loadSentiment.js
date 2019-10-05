function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class SearchUtility extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      value: event.target.value
    });
  }

  render() {
    return React.createElement("div", {
      className: "form-inline my-2 my-lg-0"
    }, React.createElement("input", {
      className: "form-control mr-sm-2",
      onChange: this.handleChange,
      type: "text",
      style: {
        width: "75%"
      },
      placeholder: "What would you like to look up?"
    }), React.createElement("button", {
      className: "btn btn-primary my-2 my-sm-0",
      onClick: this.props.updateSubject.bind(this, this.state.value)
    }, "Get Tweets")); // END OF RETURN
  } // END OF RENDER


} // END OF CLASS SEARCHUTILITY


class TwitterTable extends React.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "get_tweets", subject => {
      jQuery.ajax({
        url: 'http://173.255.223.120/sentiment',
        data: {
          subject: subject,
          numTweets: 10
        },
        success: data => {
          data.forEach(tweet => {
            console.log("Pushing a tweet row");
            this.tweetTableArray.push(tweet);
          });
          console.log(this.tweetTableArray[0]);
        },
        async: false
      });
    });

    this.tweetTableArray = [];
  }

  render() {
    // Obtain the tweets and push into an array
    if (this.props.subject !== null) {
      this.tweetTableArray = [];
      this.get_tweets(this.props.subject);
    }

    return React.createElement("table", {
      className: "table"
    }, React.createElement("thead", {
      className: "btn-primary",
      id: "tableHead",
      style: {
        color: 'white',
      }
  }, React.createElement("tr", null, React.createElement("th", {
      scope: "col"
    },"Twitter  ", React.createElement("i", {
      class: "fab fa-twitter",
      "aria-hidden": "true"
    })))), React.createElement("tbody", null, this.tweetTableArray.map(row => React.createElement("tr", {
      style: {
        padding: "10px",
        width: '50%',
      }
    }, React.createElement("td",{ style: { paddingBottom: "2%", lineHeight: "20px", fontSize: "12px" }}, null, " ", row), " "))));
  }

}

class SentimentPanel extends React.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "updateSubject", subject => {
      console.log(subject);
      this.setState({
        subject: subject
      }, () => {
        // Do something here.
        console.log(this.state.subject);
      }); //ends the setState function
    });

    this.state = {
      subject: null
    };
  }

  render() {
    return React.createElement("div", {
      style: {
        overflow: "auto",
        height: "400px"
      }
  }, React.createElement("h7", {
      className: "card-title"
    }, " Sentiment"), React.createElement(SearchUtility, {
      updateSubject: this.updateSubject
    }), React.createElement("br", null), React.createElement(TwitterTable, {
      subject: this.state.subject
    }));
  }

}

ReactDOM.render(React.createElement(SentimentPanel, null), document.getElementById('sentimentPanel'));
