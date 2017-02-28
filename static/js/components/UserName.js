import React from 'react';
import Modal from 'react-modal';

export default class UserName extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      inputValue : ""
    };

    this._onHandleSubmit = this._onHandleSubmit.bind(this);
    this._onChangeNick = this._onChangeNick.bind(this);
  }

  componentDidMount() {
    this.textInput.focus();
  }

  _onHandleSubmit(e) {
    e.preventDefault();
    const userName = this.state.inputValue;
    if(userName === "") return;
    console.log("userName," , userName);
    this.props.onChange(userName);
  }

  _onChangeNick(event) {
    this.setState({inputValue:event.target.value});
  }

  render() {return (
    <Modal
      isOpen={this.props.isModalOpen}
      shouldCloseOnOverlayClick={false}
      contentLabel="No Overlay Click Modal"
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <form onSubmit={this._onHandleSubmit}>
        <input
            ref={(input) => { this.textInput = input; }}
            value={this.state.inputValue}
            onChange={this._onChangeNick}
            type="text"
            id="username"
            placeholder="Enter nickname"></input>
        <input type="submit" value="Begin Chatting"></input>
      </form>
    </Modal>
    )
  }


}
