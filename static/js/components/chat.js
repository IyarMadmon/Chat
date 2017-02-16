import React from 'react';

export default class Chat extends React.Component {
  render() {
    return (<div>
              <h4>Hello {this.props.userName}</h4>
              <div id="chat">
                {this.props.chatContent.map(message => <MessageRow
                                                          sender={message.sender}
                                                          content={message.content}
                                                          key={message.sender + message.time}
                                                        >
                                                       </MessageRow>)}
              </div>
            </div>);
  };
}

function MessageRow(props) {
  return (<div>
            <strong>{props.sender}: </strong>
            <span>{props.content}</span>
          </div>);
}
