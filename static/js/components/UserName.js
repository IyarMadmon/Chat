import React from 'react';
import Modal from 'react-modal';

export default class UserName extends React.Component {

  _setUserName(e) {
    console.log("from inner - ",this.refs.userNameText.value);
    this.props.onChange(this.refs.userNameText.value);
  }

  render() {return (
    <Modal
      isOpen={true}
      shouldCloseOnOverlayClick={false}
      contentLabel="No Overlay Click Modal"
    >

      <h1>Force Modal</h1>
      <input ref="userNameText" type="text" id="username" placeholder="Enter nickname"></input>
      <input type="button" onClick={this._setUserName.bind(this)}></input>
    </Modal>
    )
  }
}
