import React from 'react';

export default class RoomSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRoom:""
    };
  }

  _onChangeRoom(event) {
    const roomVal = event.target.id;
    if(roomVal === this.state.selectedRoom || this.props.disabled) return;
    this.setState({selectedRoom:roomVal});
    this.props.onChange(roomVal);
  }

  _roomClass(value) {
    return "roomOption" + ((value == this.state.selectedRoom) ? " selectedRoom" : "");
  }

  render () {
    return (<div id="roomSelector" className="first-flex-item first-flex-row">
              <span>-- select a room --</span>
              {this.props.rooms.map(room => <RoomSelectOption
                                              onSelect={this._onChangeRoom.bind(this)}
                                              id={room.id}
                                              name={room.name}
                                              key={room.id}
                                              classes={this._roomClass(room.id)}>
                                            </RoomSelectOption>)}
            </div>
    );
  }
}


function RoomSelectOption(props) {
  return (<div onClick={props.onSelect} className={props.classes} value={props.name} id={props.id}>{props.name}</div>);
}
