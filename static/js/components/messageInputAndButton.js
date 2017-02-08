import React from 'react';

export default class MessageInputAndButton extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      inputValue : ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    if(this.state.inputValue === "") return;
    this.props.onSubmit(this.state.inputValue);
    this.setState({inputValue : ""});
  }

  handleChange(event) {
    this.setState({inputValue: event.target.value});
  }

  render() {
    return (<form onSubmit={this.handleSubmit}>
              <input
                disabled={!this.props.enabled}
                type="text"
                id="message"
                placeholder="Enter message"
                value={this.state.inputValue}
                onChange={this.handleChange}/>
              <input id="sendMessage" type="submit" value="->"/>
            </form>);
  }
}
