import React, {Component} from 'react';

class ComposeMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(input) {
    const message = {text: input}
    this.props.postMessage(message);
    this.setState({value: ''});
  }

  render() {
    return (
      <div>
        <textarea className='textarea' value={this.state.value} onChange={this.handleChange} placeholder='Whats on your mind?'></textarea>
        <div className='button is-success is-large' onClick={() => {this.handleSubmit(this.state.value)}}>
          Submit
        </div>
      </div>
    );
  }
}
export default ComposeMessage;
