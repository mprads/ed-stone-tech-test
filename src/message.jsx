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
        <p>{moment(this.props.created_at).format('HH:mm')}</p>
        <h1>{this.props.text}</h1>
      </div>
    );
  }
}
export default Message;
