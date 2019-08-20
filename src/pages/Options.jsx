import React from "react";
import { Container, Row, Col, Text, Icon, Checkbox, MultiSelectionGroup, Dropdown, Tile, Button, TextInput } from 'pp-react';


function Options(props) {
    return (
        <div>
            {props.orderOptions.map((element, index) => {
                return <Tile divider key={index}>
                    <Tile.Content>
                        <TextInput
                            name={element.key}
                            value={element.value}
                            label={element.key}
                            helperText={element.label}
                            rightIcon={<Icon size="xs" name="info-alt" />}
                            // onChange={self.orderOptionsTextChange.bind(self)}
                        />
                    </Tile.Content>
                </Tile>
            })}
        </div>
    )
}

export default Options;
