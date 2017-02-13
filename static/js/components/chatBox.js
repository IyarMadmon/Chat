import io from 'socket.io-client';
import React from 'react';
import Chat from './chat';
import MessageInputAndButton from './messageInputAndButton';
import RoomSelector from './roomSelector';

const socket = io();

export default class ChatBox extends React.Component {

  constructor() {
    super();
    this.state = {
      selectedRoom: null,
      chatContent: "welcome",
      userName: ""
    };
  };

  componentDidMount() {
    socket.on('connected', (data) => {
      console.log(data);
    });
    socket.on('disconnect', () => {
      if(this.state.selectedRoom) {
        socket.emit("unSubscribeFromRoom", this.state.selectedRoom);
      }
      console.log('disconnect');
    });
    socket.on('newMessage', (data) => {
      console.log("newMessage = ", data);
      const currentText = this.state.chatContent;
      this.setState({chatContent: currentText + `<strong> ${data.userName} </strong>:  ${data.messageContent} <br>`});
    });
  }

  render() {
    return (<div>

              <UserName
                onChange={this._onChangeUserName.bind(this)}/>

              <Chat
                chatContent={this.state.chatContent}/>

              <RoomSelector
                rooms={this._getRooms()}
                onChange={this._selectRoom.bind(this)}/>

              <MessageInputAndButton
                enabled={this.state.selectedRoom && this.state.userName !== ""}
                onSubmit={this._onSendMessage.bind(this)}/>
            </div>);
  }

  _onSendMessage(messageContent) {
    socket.emit("newMessage", {'userName': this.state.userName, 'messageContent': messageContent, room:this.state.selectedRoom});
  }

  _onChangeUserName(event) {
    this.setState({userName:event.target.value});
  }

  _selectRoom(roomVal) {
    if(this.state.selectedRoom) {
      socket.emit("unSubscribeFromRoom", this.state.selectedRoom);
    }
    this.setState({selectedRoom:roomVal, chatContent:`Welcome to room ${roomVal} <br>`}, () => console.log(this.state.chatContent));

    this.setState({selectedRoom:roomVal}, () => console.log(this.state.selectedRoom));
    socket.emit("subscribeToRoom", roomVal);
  }

  _getRooms() {
    return [{id:1, name:"North"}, {id:2, name:"South"}];
  }
}

function UserName(props) {
  return (<input type="text" id="username" placeholder="Enter nickname" onChange={props.onChange}></input>);
}
