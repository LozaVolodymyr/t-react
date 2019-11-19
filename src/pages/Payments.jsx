import React from "react";
import { Container, Row, Col, Text, Icon, Checkbox, MultiSelectionGroup, Dropdown, Tile, Button, TextInput } from 'pp-react';

import PaymentView from './PaymentView'


class Payments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'CARD',
      payment: props.payment
    }
  }


  onChangeDropDown(event) {
    this.state.value = event.target.value;
    this.setState(this.state);
  }

  onCheckboxChange(event) {
    this.state.value = event.target.value;
    this.setState(this.state);
  }

  orderOptionsTextChange() {
    this.state.value = event.target.value;
    this.setState(this.state);
  }

  render() {
    const { type, options, checkboxes, orderOptions } = this.state.payment;
    return (
      <Row>
        <Col className={'box-content'}>
          <Tile.Header size={'xl2'}>{type.helperText}</Tile.Header>
          <Tile.Content>
            <Dropdown
              label={type.label}
              options={options}
              value={this.state.value}
              onChange={this.onChangeDropDown.bind(this)}
            />
          </Tile.Content>
          <Tile divider>
            <Tile.Header size={'xl2'}>Payment Options</Tile.Header>
            <Tile.Content>
              {checkboxes
                .map((checkbox, index) => <Checkbox
                  key={index}
                  label={checkbox.text}
                  name={checkbox.id}
                  id={checkbox.id}
                  onChange={this.onCheckboxChange.bind(this)}
                />
                )}
            </Tile.Content>
          </Tile>
          { orderOptions.map((element, index) => {
            return <Tile divider key={index}>
              <Tile.Content>
                <TextInput
                  name={element.key}
                  value={element.value}
                  label={element.key}
                  helperText={element.label}
                  rightIcon={<Icon size="xs" name="info-alt" />}
                  onChange={this.orderOptionsTextChange.bind(this)}
                />
              </Tile.Content>
            </Tile>
          }) }
        </Col>
        <Col>
          <PaymentView identity={this.state.payment} />
        </Col>
      </Row>
    )
  };

}

export default Payments;

