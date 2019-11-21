import React from "react";
import {  Row, Col, Checkbox, Tile } from 'pp-react';

import NextButton from '../components/NextButton'
import View from '../components/View'



class Events extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: props.selectionGroup,
      template: props.template,
      component: 'events'
    }
  }

  onCheckboxChange(event) {
    const { name, value } = event.target;
    this.state.events[name].state = !this.state.events[name].state;
    this.setState(this.state);
  }


  render() {
    const { events } = this.state
    return (
      <Row>
        <Col>
        <Tile >
            <Tile.Header size={'xl2'}>Select event handlers</Tile.Header>
            <Tile.Content>
              {Object.keys(events)
                .map((key, index) => 
                <Checkbox
                  checked={events[key].state}
                  key={index}
                  label={events[key].label}
                  name={key}
                  id={key}
                  onChange={this.onCheckboxChange.bind(this)}
                />
                )}
            </Tile.Content>
          </Tile>
          <NextButton name={this.state.component} history={this.props.history} next={this.props.next}/>
        </Col>

        <Col>
          <View
          codeGenerator={this.props.codeGenerator}
          component={this.state.component}
          template={this.state.template} 
          data={this.state.events}/>
        </Col>
      </Row>
    )
  }
}

export default Events;
