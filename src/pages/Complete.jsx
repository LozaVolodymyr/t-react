import React from "react";
import {  Row, Col } from 'pp-react';

import View from '../components/View';




class Complete extends React.Component {
  constructor(props) {
    super(props);
    const keys = Object.keys(this.props.template);
    this.template = keys.length > 0 ? keys.reduce((acc, current) => {
       return acc + props.template[current]; 
    }, '') : 'CODE EXAMPLE';
  }

  donwloadFile(){
    const element = document.createElement("a");
    element.href = URL.createObjectURL(
        new Blob([this.template], {type: 'text/plain'})
    );
    element.download = "pphwebsdk-sample.js";
    document.body.appendChild(element); // FireFox
    element.click();

  }
  render() {
    return (
      <Row>
        <Col>
          <View template={this.template} donwloadFile={this.donwloadFile} codeGenerator={()=>{}}/>
        </Col>
      </Row>
    )
  }
}

export default Complete;
