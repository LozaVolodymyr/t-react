import React from "react";
import {  Row, Col, Tile, Button } from 'pp-react';

import View from '../components/View';




class Complete extends React.Component {
  constructor(props) {
    super(props);
    const keys = Object.keys(this.props.template)
    // .filter(key => key !== 'setup');
    console.log('keys===>', keys)

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

  runCode(){
    console.log('RUN CODE==>');
    const s = document.createElement('script');
    s.type = 'text/javascript';
    s.async = true;
    s.innerHTML = `(function (){${this.template}})();`;
    console.log('s===>', s)

    document.getElementsByTagName('head')[0].appendChild(s);
  }

  render() {
    return (
      <Row>
        <Col>
          <View template={this.template} donwloadFile={this.donwloadFile} runCode={this.runCode} codeGenerator={()=>{}}/>
        </Col>
        {/* <Tile card>
            <Tile.Header size={'xl'}>Run the genrated to code</Tile.Header>
            <Tile.Content>
              <Button size={'lg'} id={'runCode'} className={'pp-link'} >Try It Out</Button>
            </Tile.Content>
          </Tile> */}
      </Row>
    )
  }
}

export default Complete;
