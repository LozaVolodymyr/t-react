import React from "react";
import { Container, Row, Col, Text, Icon, Checkbox, MultiSelectionGroup, Dropdown, Tile, Button, TextInput } from 'pp-react';

import View from '../components/View'


function Payments(props) {
  return (
    <div className={'main'}>
      <div className={'box-content'}>
        {props.identity.map((element, index) => {
          return <Tile divider key={index}>
            <Tile.Content>
              <TextInput
                name={element.key}
                value={element.value}
                label={element.key}
                helperText={element.label}
                rightIcon={<Icon size="xs" name="info-alt" />}
              // onChange={self.identityTextChange.bind(self)}
              />
            </Tile.Content>
          </Tile>
        })}
        <button onClick={props.updateView}> ADD EVENT</button>
      </div>
      <div className={'sidebar-right'}>
        <View view={props.view} />
      </div>
    </div>
  )
}

export default Payments;

