import React from "react";
import View from '../components/View'

import { Button, Container, Text } from 'pp-react';


const view = [`
// Returns a Promise of whether the setup is complete or not
   
   pphwebsdk.Setup.isSetupComplete()
       .then(function () {
           console.log('setup complete'); })
       .catch(function (err) {
           console.log(err);
               
           \*Starts the UI Flow to download, setup and 
           *test the Web Interface  */
               
           pphwebsdk.Setup.startUIFlow(function (err) {
           console.log('done with setup');
       });
   });
`]

function setupPPH() {
    setTimeout(() => {
      try {
        pphwebsdk.Setup.isSetupComplete()
        .then(function () {
          document.getElementById('setupButton').classList.add('pp-link__done');
          document.getElementById('setupPPH').classList.add('pp-link__done');
          document.getElementById('takePayments').classList.remove('isDisabled');
          document.getElementById('takePayments').classList.remove('isDisabled');
        }).catch(function (err) {
          pphwebsdk.Setup.startUIFlow(function (err) {
            document.getElementById('setupButton').classList.remove('pp-link__err');
          });
          document.getElementById('setupButton').classList.add('pp-link__err');
        });
      } catch (e) {
        document.getElementById('setupButton').classList.remove('pp-link');
        document.getElementById('setupButton').classList.add('pp-link__err');
      }
    }, 500);
  }

function Setup() {
    return (
        <Container className={'main'}>
            <div className={'box-content'}>
                <h1>Setting up PPH Web SDK</h1>
            <Text>
                This is a one time setup to install the supporting web interface app required for PPH Web SDK
            </Text>
            <Button size="lg" id={'setupButton'} className={'pp-link'} onClick={(event) => {setupPPH(event)}}>Setup PPH</Button>
            </div>
            {/* <div className={'sidebar-right'}>
                <View view={view} />
            </div> */}
        </Container>
    )
}

export default Setup;

