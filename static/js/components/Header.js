import React from 'react';

export default class Header extends React.Component {

  displayName() {
    if(this.props.userName) {
        return `Hello ${this.props.userName}`;
    }
    return '';

  }
  render() {
    return (<header >
              <h1>Chat Shit</h1>
              <h4 id="name-display">{this.displayName()}</h4>
            </header>);
  }
}
