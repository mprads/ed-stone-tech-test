import React, {Component} from 'react';
import MessageList from './messageList.jsx';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messageList: []
    }

  }

  componentDidMount() {

  }
  render() {
    return (
      <MessageList />
    );
  }
}
export default App;
