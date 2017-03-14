import React, {Component} from 'react';
import MessageList from './messageList.jsx';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messageList: []
    }
    this.getMessages = this.getMessages.bind(this);
    this.deleteMessage = this.deleteMessage.bind(this);
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
      console.log('Get Request Failed')
    })
  }

  deleteMessage(id) {
    fetch(`${URL}${id}/`,
    { method: 'delete'
    })
    .then(() => {
      this.getMessages(URL);
    })
    .catch((err) => {
      console.log('Delete Failed')
    })
  }

  componentDidMount() {
    this.getMessages(URL);
  }
  render() {
    return (
      <MessageList
        deleteMessage={this.deleteMessage}
        messageList={this.state.messageList}
      />
    );
  }
}
export default App;
