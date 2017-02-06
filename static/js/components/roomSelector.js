import React from 'react';

export default class RoomSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render () {
    return (<span>
              <label>room
                <select id = "roomSelector" onChange={this.props.onChange}>
                  <option disabled selected value=""> -- select a room -- </option>
                  {this.props.rooms.map(room => <RoomSelectOption id={room.id} name={room.name} key={room.id}>{room.name}</RoomSelectOption>)}
                </select>
              </label>
            </span>);
  }
}

function RoomSelectOption(props) {
  return (<option value={props.name} id={props.id}>{props.name}</option>);
}
