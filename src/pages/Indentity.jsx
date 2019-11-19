import React from "react";
import { Container, Row, Col, Text, Icon, Checkbox, MultiSelectionGroup, Dropdown, Tile, Button, TextInput } from 'pp-react';

import IndentityView from './IndentityView'

import View from '../components/View'


class Indentity extends React.Component {
  constructor(props){
    super(props);

      this.state = { 
        identity: props.identity
      }
      this.tempalte = `const identity = pphwebsdk.Identity
            .create({${props.identity.accessToken.value}})           
            .environment({${props.identity.environment.value}})
            .refreshUrl({${props.identity.refreshUrl.value}});`
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
          {/* <Button onClick={this.props.updateView}>ADD EVENT</Button> */}
        </Col>

        <Col>
          <IndentityView identity={this.state.identity} tempalte= {this.tempalte } />
        </Col>
      </Row>
    )
  }
}

export default Indentity;
