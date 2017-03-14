import React, {Component} from 'react';
import MessageList from './messageList.jsx';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messageList: []
    }
    this.getMessages = this.getMessages.bind(this);
    URL = 'http://myles-rademaker-test.herokuapp.com/messages/';
  }

  getMessages(url) {
    let resultArr = [];
    fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((result) => {
       resultArr = result.results;
       this.setState({messageList: resultArr}, (callback) => {
         if (callback) {
           callback();
         }
       });
    })
    .then((err) => {
      console.log('Get Request Failed')
    })
  }

  componentDidMount() {
    this.getMessages(URL);
  }
  render() {
    return (
      <MessageList
        messageList={this.state.messageList}
      />
    );
  }
}
export default App;
