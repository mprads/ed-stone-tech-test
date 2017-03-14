import React, {Component} from 'react';
import MessageList from './messageList.jsx';
import ComposeMessage from './composeMessage.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageList: []
    }
    this.getMessages = this.getMessages.bind(this);
    this.deleteMessage = this.deleteMessage.bind(this);
    this.postMessage = this.postMessage.bind(this);
    URL = 'http://myles-rademaker-test.herokuapp.com/messages/';
  }

  getMessages(url) {
    let resultArr = [];
    fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((result) => {
      // check to see if the url is the main page or not
      if (url != URL) {
        // add the new array onto the array in state from the first page
        resultArr = this.state.messageList.concat(result.results);
      }
      else {
       resultArr = result.results;
     }
       this.setState({messageList: resultArr}, () => {
        //  check if there is a next page
         if (result.next) {
           this.getMessages(result.next);
         }
       });
    })
    .catch((err) => {
      console.log('Get Request Failed');
    });
  }

  deleteMessage(id) {
    fetch(`${URL}${id}/`,
    {
      method: 'delete'
    })
    .then(() => {
      this.getMessages(URL);
    })
    .catch((err) => {
      console.log('Delete Failed');
    });
  }

  postMessage(input) {
    fetch(URL,
    {
      method: 'post',
      headers: new Headers({'content-type': 'application/json'}),
      body: JSON.stringify(input)
    })
    .then((res) => {
      return res.json();
    })
    .then(() => {
      this.getMessages(URL);
    })
    .catch((err) => {
      console.log('Failed to Post');
    });
  }

  componentDidMount() {
    this.getMessages(URL);
  }
  render() {
    return (
      <div>
        <div>
          <ComposeMessage
            postMessage={this.postMessage}
            />
        </div>
        <div>
          <MessageList
            deleteMessage={this.deleteMessage}
            messageList={this.state.messageList}
          />
        </div>
      </div>
    );
  }
}
export default App;
