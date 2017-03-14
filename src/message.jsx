import React, {Component} from 'react';
import moment from 'moment';

class Message extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <p>{this.props.id}</p>
        <p>{moment(this.props.created_at).format('MMMM Do YYYY, h:mm:ss a')}</p>
        <h1>{this.props.text}</h1>
        <div onClick={() =>{this.props.deleteMessage(this.props.id)}}>
          DELETE
        </div>
      </div>
    );
  }
}
export default Message;
