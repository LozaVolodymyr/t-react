import React from "react";
import View from '../components/View'

import { Button, Container, Text, Row, Col } from 'pp-react';


class Setup extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      template: props.template
    }
  }


  setupPPH() {
    pphwebsdk.Setup.isSetupComplete()
      .then(function () {
        document.getElementById('setupButton').classList.add('pp-link__done');
        document.getElementById('setupPPH').classList.add('pp-link__done');
        document.getElementById('merchantIdentity').classList.remove('isDisabled');
      }).catch(function (err) {
        pphwebsdk.Setup.startUIFlow(function (err) {
          document.getElementById('setupButton').classList.remove('pp-link__err');
        });
        document.getElementById('setupButton').classList.add('pp-link__err');
      });
  }


  render(){
  return (
    <Row>
      <Col className={'box-content'}>
        <h1>Setting up PPH Web SDK</h1>
        <Text>
          This is a one time setup to install the supporting web interface app required for PPH Web SDK
            </Text>
        <Button size="lg" id={'setupButton'} className={'pp-link'} onClick={(event) => { this.setupPPH(event) }}>Setup PPH</Button>
      </Col>

      <Col>
        <View template={this.state.template} />

      </Col>
    </Row>
  )
  }
}

export default Setup;



