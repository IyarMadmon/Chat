import io from 'socket.io-client';
import React from 'react';
import Chat from './chat';
import UserName from './UserName';
import MessageInputAndButton from './messageInputAndButton';
import RoomSelector from './roomSelector';
import request from 'superagent';

const socket = io();

export default class ChatBox extends React.Component {

  constructor() {
    super();
    this.state = {
      rooms:[],
      selectedRoom: null,
      chatContent: "welcome",
      userName: "",
      isLoginModalOpen: true
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

    this._getRooms();
  }

  render() {
    return (<div>

              <UserName
                onChange={this._onChangeUserName.bind(this)}
                isModalOpen={this.state.isLoginModalOpen}/>

              <Chat
                chatContent={this.state.chatContent}
                userName = {this.state.userName}/>

              <RoomSelector
                rooms={this.state.rooms}
                onChange={this._selectRoom.bind(this)}/>

              <MessageInputAndButton
                enabled={this.state.selectedRoom && this.state.userName !== ""}
                onSubmit={this._onSendMessage.bind(this)}/>
            </div>);
  }

  _onSendMessage(messageContent) {
    socket.emit("newMessage", {'userName': this.state.userName, 'messageContent': messageContent, room:this.state.selectedRoom});
  }

  _onChangeUserName(userName) {
    console.log("change username - ", userName);
    this.setState({userName, isLoginModalOpen:false});
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
    request.get('/rooms').end((err, res) => {
      this.setState({rooms:res.body});
    })
  }
}
