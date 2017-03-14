import React, {Component} from 'react';
import moment from 'moment';

class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageDetails: {}
    }
    this.getMessageById = this.getMessageById.bind(this);
  }

  getMessageById(id) {
    fetch(`${this.props.URL}${this.props.id}`)
    .then((res) => {
      return res.json();
    })
    .then((result) => {
      this.setState({messageDetails: result}, () => {});
    })
    .catch((err) => {
      console.log('Failed to Get Message Details');
    })
  }

  componentDidMount() {
    this.getMessageById(this.props.id);
  }

  render() {
    return (
      <div>
        <p>{this.props.id}</p>
        <p>{moment(this.props.created_at).format('MMMM Do YYYY, h:mm:ss a')}</p>
        <h1>{this.props.text}</h1>
        <div>
          <p>{this.state.messageDetails.author}</p>
          <p>{this.state.messageDetails.in_reply_to}</p>
          <p>{this.state.messageDetails.utc_offset}</p>
          <p>{moment(this.state.messageDetails.updated_at).format('MMMM Do YYYY, h:mm:ss a')}</p>
        </div>
        <div onClick={() => {this.props.deleteMessage(this.props.id)}}>
          DELETE
        </div>
      </div>
    );
  }
}
export default Message;
