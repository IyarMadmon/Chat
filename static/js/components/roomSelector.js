import React from 'react';

export default class RoomSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render () {



    return (<div id="roomSelector">
              <span className="roomOption">one</span>
              <span className="roomOption">two</span>
            </div>

    );
  }
}

function RoomSelectOption(props) {
  return (<option value={props.name} id={props.id}>{props.name}</option>);
}
