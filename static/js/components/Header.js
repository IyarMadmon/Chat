import React from 'react';

export default class Header extends React.Component {
  render() {
    return (<header >
              <h4 id="name-display">Hello {this.props.userName}</h4>
              <h1> Chat Shit </h1>
            </header>);
  }
}
