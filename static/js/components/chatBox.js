import io from 'socket.io-client';
import React from 'react';
import Chat from './chat';
import UserName from './UserName';
import Header from './Header';
import MessageInputAndButton from './messageInputAndButton';
import RoomSelector from './roomSelector';
import request from 'superagent';

const socket = io();

export default class ChatBox extends React.Component {

  constructor() {
    super();
    this.mesConut = 0;
    this.state = {
      rooms:[],
      selectedRoom: null,
      chatContent: [],
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
        socket.emit("unSubscribeFromRoom", {roomId:this.state.selectedRoom, userName: this.state.userName} );
      }
      console.log('disconnect');
    });
    socket.on('newMessage', (data) => {
      console.log("newMessage = ", data);
      const chatContent =  this.state.chatContent.concat(data);
      this.setState({chatContent});
    });

    this._getRooms();
  }

  render() {
    return (<div>
              <Header
                userName = {this.state.userName}/>
              <main>
                <UserName
                  onChange={this._onChangeUserName.bind(this)}
                  isModalOpen={this.state.isLoginModalOpen}/>

                <RoomSelector
                  rooms={this.state.rooms}
                  disabled={this.state.isLoginModalOpen}
                  onChange={this._selectRoom.bind(this)}/>

                <Chat
                  chatContent={this.state.chatContent}/>

                <MessageInputAndButton
                  enabled={this.state.selectedRoom && this.state.userName !== ""}
                  onSubmit={this._onSendMessage.bind(this)}/>
              </main>
            </div>);
  }

  _onSendMessage(messageContent) {
    socket.emit("newMessage", {sender: this.state.userName, content: messageContent, room:this.state.selectedRoom, time:new Date().getTime()});
  }

  _onChangeUserName(userName) {
    this.setState({userName, isLoginModalOpen:false});
  }

  _selectRoom(roomVal) {
    if(this.state.selectedRoom) {
      socket.emit("unSubscribeFromRoom", {roomId:this.state.selectedRoom, userName: this.state.userName} );
    }

    this.setState({selectedRoom:roomVal});
    socket.emit("subscribeToRoom", {roomId:roomVal, userName: this.state.userName});

    request.get(`/room/messages/${roomVal}`).end((err, res) => {
      const messages = res.body.messages;
      this.setState({chatContent: messages ? messages : []});
    })
  }

  _getRooms() {
    request.get('/rooms').end((err, res) => {
      this.setState({rooms:res.body});
    });
  }
}
