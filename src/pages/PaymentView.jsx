import React from "react";
import { Container, Row, Col, Text, Icon, Checkbox, MultiSelectionGroup, Dropdown, Tile, Button, TextInput } from 'pp-react';

import Highlight from 'react-highlight'

import View from '../components/View'



function  IndentityView(props) {
        return (
        <Highlight className='arduino-light' language="javascript">
            {/* { `const identity = pphwebsdk.Identity
            .environment({${props.identity.environment.value}})
            .create({${props.identity.accessToken.value}})           
            .refreshUrl({${props.identity.refreshUrl.value}});`
            } */}
        </Highlight>)
}
export default IndentityView;


// Creating Identity


// refreshToken