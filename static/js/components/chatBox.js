import io from 'socket.io-client';
import React from 'react';
import Chat from './chat';
import MessageInputAndButton from './messageInputAndButton';

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
        socket.emit("unSubscribeFromRoom", currentRoom);
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
              <UserName onChange={this._onChangeUserName.bind(this)}/>
              <RoomSelector rooms={this._getRooms()} onChange={this._selectRoom.bind(this)}/>
              <Chat chatContent={this.state.chatContent}/>
              <MessageInputAndButton enabled={this.state.selectedRoom && this.state.userName !== ""} onSubmit={this._onSendMessage.bind(this)}/>
            </div>);
  }

  _onSendMessage(messageContent) {
    socket.emit("newMessage", {'userName': this.state.userName, 'messageContent': messageContent, room:this.state.selectedRoom});
  }

  _onChangeUserName(event) {
    this.setState({userName:event.target.value});
  }

  _selectRoom(event) {
    if(this.state.selectedRoom) {
      socket.emit("unSubscribeFromRoom", this.state.selectedRoom);
    }
    this.setState({selectedRoom:event.target.value, chatContent:`Welcome to room ${event.target.value} <br>`}, () => console.log(this.state.chatContent));

    this.setState({selectedRoom:event.target.value}, () => console.log(this.state.selectedRoom));
    socket.emit("subscribeToRoom", event.target.value);
  }

  _getRooms() {
    return [{id:1, name:"North"}, {id:2, name:"South"}];
  }
}

function UserName(props) {
  return (<input type="text" id="username" placeholder="Enter nickname" onChange={props.onChange}></input>);
}

function RoomSelector(props) {
  return (<span>
            <span>room:</span>
            <select id = "roomSelector" onChange={props.onChange}>
              <option disabled selected value=""> -- select a room -- </option>
              {props.rooms.map(room => <RoomSelectOption id={room.id} name={room.name} key={room.id}>{room.name}</RoomSelectOption>)}
            </select>
          </span>);
}

function RoomSelectOption(props) {
  return (<option value={props.name} id={props.id}>{props.name}</option>);
}
