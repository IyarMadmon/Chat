import React from 'react';

export default class Participants extends React.Component {
  render() {
    return (<div id="participants" className="third-flex-item first-flex-row">
              <span>-- Participants --</span>
              {this.props.participants.map(participant => <Participant
                                              id={participant.name}
                                              name={participant.name}
                                              key={participant.name}>
                                            </Participant>)}
            </div>
    );
  }
}

function Participant(props) {
  return return (<div className="" value={props.name} id={props.id}>{props.name}</div>);
}
