import React from 'react';

export default class Participants extends React.Component {
  render() {
    return (<div id="participants" className="third-flex-item first-flex-row">
              <span>-- Participants --</span>
              {this.props.participants.map(participant => <Participant
                                              name={participant}
                                              key={participant}>
                                            </Participant>)}
            </div>
    );
  }
}

function Participant(props) {
  return (<div className="" >{props.name}</div>);
}
