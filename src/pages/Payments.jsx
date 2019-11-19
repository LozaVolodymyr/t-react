import React from "react";
import { Container, Row, Col, Text, Icon, Checkbox, MultiSelectionGroup, Dropdown, Tile, Button, TextInput } from 'pp-react';

import View from '../components/View'


function identityTextChange(){
  console.log('changed-->')
}

class Payments extends React.Component {
  constructor(props){
      super(props);
        this.state = { 
          identity: props.payments
        }
        this.tempalte = `const identity = pphwebsdk.Identity
              .create({${props.identity.accessToken.value}})           
              .environment({${props.identity.environment.value}})
              .refreshUrl({${props.identity.refreshUrl.value}});`
    }


  onChange(event){
    // const fieldName = event.target.name;
    // const fieldName = event.target.value;
    this.setState({

    });

  }
  render() {
    return (
      <Row>
        <Col className={'box-content'}>
          {this.props.identity.map((element, index) => {
            return <Tile key={index}>
                <TextInput
                  name={element.key}
                  value={element.value}
                  label={element.key}
                  helperText={element.label}
                  rightIcon={<Icon size="xs" name="info-alt" />}
                  onChange={this.onChange}
                />
            </Tile>
          })}
          <Button onClick={this.props.updateView}>ADD EVENT</Button>
        </Col>

        <Col>
          <View view={this.state.view} />
        </Col>
      </Row>
    )
  }
 
}

export default Payments;

