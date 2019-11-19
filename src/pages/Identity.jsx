import React from "react";
import { Row, Col, Icon, Tile, Button, TextInput } from 'pp-react';

import View from '../components/View'


class Identity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      identity: props.identity,
      template: props.template
    }
  }

  onChange(event) {
    const { name, value } = event.target;
    const updateProperty = { ...this.state };
    updateProperty.identity[name]['value'] = value;
    this.setState({ updateProperty });
    this.forceUpdate();
  }


  render() {
    const identity = this.state.identity;
    return (
      <Row>
        <Col className={'box-content'}>
          {Object.keys(identity).map((key, index) => {
            return <Tile key={index}>
              <Tile.Content>
                <TextInput
                  name={key}
                  value={identity[key].value}
                  label={key}
                  helperText={identity[key].label}
                  rightIcon={<Icon size="xs" name="info-alt" />}
                  onChange={this.onChange.bind(this)}
                />
              </Tile.Content>
            </Tile>
          })}
          <Button size="lg" id={'setupButton'} className={'pp-link'} onClick={(event) => { console.log('next') }} >Next</Button>
        </Col>

        <Col>
          <View template={this.state.template} data={this.state.identity} />

        </Col>
      </Row>
    )
  }
}

export default Identity;
