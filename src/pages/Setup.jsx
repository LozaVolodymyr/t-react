import React from "react";
import { Button, Text, Row, Col } from 'pp-react';

import View from '../components/View'
import NextButton from '../components/NextButton'


class Setup extends React.Component {
  constructor(props) {
    super(props)
    console.log('template props==>', props)
    this.state = {
      template: props.template
    }
    this.next = props.next;
  }


  setupPPH() {
    pphwebsdk.Setup.isSetupComplete()
      .then(function () {
        document.getElementById('setupButton').classList.add('pp-link__done');
        document.getElementById('setupPPH').classList.add('pp-link__done');
        // document.getElementById('merchantIdentity').classList.remove('isDisabled');
        document.getElementById('nextButton').classList.remove('isDisabled');
      }).catch(function (err) {
        pphwebsdk.Setup.startUIFlow(function (err) {
          document.getElementById('setupButton').classList.remove('pp-link__err');
        });
        document.getElementById('setupButton').classList.add('pp-link__err');
      });
  }


  render() {
    return (
      <Row>
        <Col className={'box-content'}>
          <h1>Setting up PPH Web SDK</h1>
          <Text>
            This is a one time setup to install the supporting web interface app required for PPH Web SDK
            </Text>
          <Row>
            <Col>
              <NextButton name={'setup'} history={this.props.history} isDisabled={true} next={this.props.next} />
            </Col>
            <Col>
              <Button size="md" id={'setupButton'} className={'pp-link'} onClick={(event) => { this.setupPPH(event) }}>Setup PPH</Button>
            </Col>
          </Row>
        </Col>
        <Col>
          <View template={this.state.template} />
        </Col>
      </Row>
    )
  }
}

export default Setup;



