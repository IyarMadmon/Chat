class ChatBox extends React.Component {

  constructor() {
    super();
    this.state = {
      selectedRoom: null,
      chatContent: "welcome",
      userName: "",
      messageContent: ""
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
      this.setState({chatContent: [currentText, "<strong>", data.userName, "</strong>: ", data.messageContent, "<br>"].join()});
    });
  }

  render() {
    return (<div>
              <UserName onChange={this._onChangeUserName.bind(this)}/>
              <RoomSelector rooms={this._getRooms()} onChange={this._selectRoom.bind(this)}/>
              <Chat chatContent={this.state.chatContent}/>
              <MessageInput onChange={this._onMessageChange.bind(this)}/>
              <SendMessageButton onClick={this._onSendMessage.bind(this)} enabled={this.state.selectedRoom && this.state.userName !== "" && this.state.messageContent !== ""}/>
            </div>);
  }

  _onSendMessage(event) {
    socket.emit("newMessage", {'userName': this.state.userName, 'messageContent': this.state.messageContent, 'room':this.state.selectedRoom});
    this.setState({messageContent: ""});
  }

  _onMessageChange(event) {
    this.setState({messageContent:event.target.value});
  }

  _onChangeUserName(event) {
    this.setState({userName:event.target.value});
  }

  _selectRoom(event) {
    if(this.state.selectedRoom) {
      socket.emit("unSubscribeFromRoom", this.state.selectedRoom);
    }
    this.setState({selectedRoom:event.target.value, chatContent:`Welcome to room ${event.target.value}`});
    this.setState({selectedRoom:event.target.value}, () => console.log(this.state.selectedRoom));
    socket.emit("subscribeToRoom", event.target.value);
    // console.log(event.target.value);
    // console.log(this.state.selectedRoom);
  }

  _getRooms() {
    return [{id:1, name:"North"}, {id:2, name:"South"}];
  }
}

class UserName extends React.Component {
  render() {
    return (<input type="text" id="username" placeholder="Enter nickname" onChange={this.props.onChange}></input>);
  }
}

class RoomSelector extends React.Component {
  render() {
    return (<span>
              <span>room:</span>
              <select id = "roomSelector" onChange={this.props.onChange}>
                <option disabled selected value=""> -- select a room -- </option>
                {this.props.rooms.map(room => <RoomSelectOption id={room.id} name={room.name} key={room.id}>{room.name}</RoomSelectOption>)}
              </select>
            </span>);
  }
}

class RoomSelectOption extends React.Component {
  render() {
    return (<option value={this.props.name} id={this.props.id}>{this.props.name}</option>);
  };
 }

class Chat extends React.Component {
  render() {
    return (<div id="chat">{this.props.chatContent}</div>);
  };
}

class MessageInput extends React.Component {
  render() {
    return (<input type="text" id="message" placeholder="Enter message" onChange={this.props.onChange}></input>);
  }
}

class SendMessageButton extends React.Component {
  render() {
      return (<button id="sendMessage" default="true" disabled={!this.props.enabled} onClick={this.props.onClick}>Send</button>);
  }
}

const socket = io();
ReactDOM.render( <ChatBox/>, document.getElementById("main"));
