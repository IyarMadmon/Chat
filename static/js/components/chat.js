import React from 'react';

export default class Chat extends React.Component {

  createMarkup() {
    return {__html: this.props.chatContent};
  }

  render() {
    return (<div id="chat" dangerouslySetInnerHTML={this.createMarkup()}></div>);
  };
}
