import React from 'react';
import Modal from 'react-modal';

export default class UserName extends React.Component {

  _setUserName(e) {
    const userName = this.refs.userNameText.value;
    if(userName === "") return;
    this.props.onChange(userName);
  }

  render() {return (
    <Modal
      isOpen={this.props.isModalOpen}
      shouldCloseOnOverlayClick={false}
      contentLabel="No Overlay Click Modal"
      style={{
        overlay : {
          position          : 'fixed',
          top               : 0,
          left              : 0,
          right             : 0,
          bottom            : 0,
          backgroundColor   : 'rgba(255, 255, 255, 0.75)'
        },
        content : {
          position                   : 'absolute',
          top                        : '400px',
          left                       : '400px',
          right                      : '400px',
          bottom                     : '400px',
          border                     : '1px solid #ccc',
          background                 : '#fff',
          overflow                   : 'auto',
          WebkitOverflowScrolling    : 'touch',
          borderRadius               : '4px',
          outline                    : 'none',
          padding                    : '20px'

        }
      }}
    >

      <input ref="userNameText" type="text" id="username" placeholder="Enter nickname"></input>
      <input type="button" onClick={this._setUserName.bind(this)} value="Begin Chatting"></input>
    </Modal>
    )
  }


}
