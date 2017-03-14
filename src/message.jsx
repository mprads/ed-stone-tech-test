import React, {Component} from 'react';
import moment from 'moment';

class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDescription: '',
      messageDetails: {}
    }
    this.getMessageById = this.getMessageById.bind(this);
    this.showDescription = this.showDescription.bind(this);
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

  showDescription () {
    if (!this.state.showDescription) {
      this.setState({showDescription: 'is-active'});
    } else {
      this.setState({showDescription: ''});
    }
  }

  componentDidMount() {
    this.getMessageById(this.props.id);
  }

  render() {
    return (
      <div className='message'>
        <article onClick={this.showDescription}>
          <p>Created At: {moment(this.props.created_at).format('MMMM Do YYYY, h:mm:ss a')}</p>
          <h1>{this.props.text}</h1>
          <div className={`messageDetails ${this.state.showDescription}`}>
            <p>Author: {this.state.messageDetails.author}</p>
            <p>In Reply To:{this.state.messageDetails.in_reply_to}</p>
            <p> UTC Offset: {this.state.messageDetails.utc_offset}</p>
            <p> Updated At:{moment(this.state.messageDetails.updated_at).format('MMMM Do YYYY, h:mm:ss a')}</p>
          </div>
          <div className='button is-danger' onClick={() => {this.props.deleteMessage(this.props.id)}}>
            DELETE
          </div>
          </article>
      </div>
    );
  }
}
export default Message;
