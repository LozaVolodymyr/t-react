import React from "react";
import {  Row, Col,  Icon, Checkbox, Dropdown, Tile, TextInput } from 'pp-react';

import NextButton from '../components/NextButton'
import View from '../components/View'


class Payments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      payment: props.payment,
      template: props.template
    }

    console.log('Payments', props)
  }


  onChangeDropDown(event) {
    const { name, value } = event.target;
    const { value: checkBoxValue, text } = this.state.payment.options.find(el => el.value ===  value);
    this.state.payment.active = {
      value: checkBoxValue,
      text
    };
    this.setState(this.state);
  }

  onCheckboxChange(event) {
    const { name, value } = event.target;
    this.state.payment.checkboxes[name].state = !this.state.payment.checkboxes[name].state;
    this.setState(this.state);
  }

  orderOptionsTextChange(event) {
    const { name, value } = event.target;
    this.state.payment.orderOptions[name].value = value;
    this.setState(this.state);
  }

  render() {
    const { type, checkboxes, orderOptions } = this.state.payment;
    return (
      <Row>
        <Col className={'box-content'}>
          <Tile.Header size={'xl2'}>{type.helperText}</Tile.Header>
          <Tile.Content>
            <Dropdown
              label={type.label}
              options={this.state.payment.options}
              value={this.state.payment.active.value}
              onChange={this.onChangeDropDown.bind(this)}
            />
          </Tile.Content>

          <Tile divider>
            <Tile.Header size={'xl2'}>Payment Options</Tile.Header>
            <Tile.Content>
              {Object.keys(checkboxes)
                .map((key, index) => 
                <Checkbox
                  checked={checkboxes[key].state}
                  key={index}
                  label={checkboxes[key].text}
                  name={key}
                  id={key}
                  onChange={this.onCheckboxChange.bind(this)}
                />
                )}
            </Tile.Content>
          </Tile>
          { Object.keys(orderOptions).map((key, index) => {
            return <Tile key={index}>
              <Tile.Content>
                <TextInput
                  name={key}
                  value={orderOptions[key].value}
                  label={key}
                  helperText={orderOptions[key].label}
                  rightIcon={<Icon size="xs" name="info-alt" />}
                  onChange={this.orderOptionsTextChange.bind(this)}
                />
              </Tile.Content>
            </Tile>
          }) }
          <NextButton name={'payments'} history={this.props.history} next={this.props.next}/>
        </Col>
        
        <Col>
          <View template={this.state.template} data={this.state.payment}/>
        </Col>
      </Row>
    )
  };

}

export default Payments;

