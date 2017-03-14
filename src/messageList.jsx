import React, {Component} from 'react';
import Message from './message.jsx'

class MessageList extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const results = this.props.messageList.map((message) => {
      return (
        <Message
          key={message.id}
          id={message.id}
          text={message.text}
          created_at={message.created_at}
        />
      );
    })
    return (
      <div>
        {results}
      </div>
    );
  }
}
export default MessageList;
