class ChatBox extends React.Component {

  constructor() {
    super();
    this.state = {
      selectedRoom: null
    };
  };

  componentDidMount() {
    socket.on('connected', (data) => {
      console.log(data);
    });
    socket.on('disconnect', () => {
      //socket.emit("unSubscribeFromRoom", currentRoom);
      console.log('disconnect');
    });
  }

  render() {
    return (<div>
              <UserName/>
              <RoomSelector rooms={this._getRooms()} onChange={this._selectRoom.bind(this)}/>
              <Chat/>
              <MessageInput/>
              <SendMessageButton/>
            </div>);
  }

  _selectRoom(event) {
    console.log("select");
    console.log(event);
    console.log(this);
  }

  _getRooms() {
    return [{id:1, name:"North"}, {id:2, name:"South"}];
  }
}

class UserName extends React.Component {
  render() {
    return (<input type="text" id="username" placeholder="Enter nickname"></input>);
  }
}

class RoomSelector extends React.Component {
  render() {
    return (<span>
              <span>room:</span>
              <select id = "roomSelector" onChange={() => this.props.onChange("3")}>
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
    return (<div id="chat"></div>);
  };
}

class MessageInput extends React.Component {
  render() {
    return (<input type="text" id="message" placeholder="Enter message"></input>);
  }
}

class SendMessageButton extends React.Component {
  render() {
      return (<button id="sendMessage" default="true" >Send</button>);
  }
}

const socket = io();
ReactDOM.render( <ChatBox/>, document.getElementById("main"));
