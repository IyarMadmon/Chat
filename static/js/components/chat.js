import React from 'react';

export default class Chat extends React.Component {

  createMarkup() {
    return {__html: this.props.chatContent};
  }

  render() {
    return (<div>
              <h4>Hello {this.props.userName}</h4>
              <div
                id="chat"
                dangerouslySetInnerHTML={this.createMarkup()}>
              </div>
            </div>);
  };
}
