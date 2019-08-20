import React from "react";
import { Container, Row, Col, Text, Icon, Checkbox, MultiSelectionGroup, Dropdown, Tile, Button, TextInput } from 'pp-react';


function Identity(props) {
  return (
    <div>
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
    </div>
  )
}

export default Identity;
