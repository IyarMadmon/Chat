import React from 'react';

export default class Chat extends React.Component {
  render() {
    return (
              <div id={this.props.elementId} className="second-flex-item first-flex-row main-boxes">
                {this.props.chatContent.map(message => <MessageRow
                                                          sender={message.sender}
                                                          content={message.content}
                                                          key={message.sender + message.time}
                                                        >
                                                       </MessageRow>)}
              </div>
            );
  };
}

function MessageRow(props) {
  return (<div>
            <strong>{props.sender}: </strong>
            <span>{props.content}</span>
          </div>);
}
