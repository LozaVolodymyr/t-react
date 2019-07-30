import React, { Component} from "react";
import {hot} from "react-hot-loader";
import "./App.css";
import { Container, Row, Col, Text, Icon, Checkbox, MultiSelectionGroup, Dropdown, Tile, Button } from 'pp-react';

class App extends Component{
  constructor (props) {
    super(props);
    this.state = {
      data: {
        checkboxes:
          [
            {
              id: 'quickChip',
              text: 'Quick Chip',
              commentString: '// Configure for Quick Chip',
              api: (configObject) => `${configObject}.useQuickChip();`
            },
            {
              id: 'skipReceipt',
              text: 'Skip Receipt',
              commentString: '// Configure for Skip Receipt',
              api: (configObject) => `${configObject}.tag(\'skipReceipt\');`
            },
            {
              id: 'showPromptInReader',
              text: 'Show Prompt in Reader',
              commentString: '// Configure for showing prompts in reader',
              api: (configObject) => `${configObject}.showPromptInReader();`
            },
            {
              id: 'showPromptInApp',
              text: 'Show Prompt in App',
              commentString: '// Configure for showing prompts in App',
              api: (configObject) => `${configObject}.showPromptInApp();`
            },
            {
              id: 'fakeapi',
              text: 'Fake API Response',
              commentString: '// Configure for Fake API Responses',
              api: (configObject) => `${configObject}.useFakeAPIServer();`
            },
          ],
        selectionGroup: [
          {
            label: 'Payment Success',
            name: 'onPaymentSuccess',
            id: 'eh_ps',
            alertText: '\'success\'',
            functionParam: 'txnRecord'
          },
          {
            label: 'Payment Failure',
            name: 'onPaymentFailure',
            id: 'eh_pf',
            functionParam: 'err',
            alertText: '\'failed with\' + err',
          },
        ],
        selections:
          [
            {
              id: 'vaultingOptions',
              label: 'Vault Options', placeholder: 'Enable vaulting', helperText: 'Choose which vault option to enable',
              options: [
                {
                  label: 'Vault Only', value: 'vaultOnly',
                }, {
                  label: 'Vault and Pay', value: 'vap',
                }
              ],
            }, {
            id: 'simulatorOptions',
            label: 'Reader Simulator', placeholder: 'Pick mock reader', helperText: 'Choose which reader to mock',
            options: [
              {
                label: 'Swipe', value: 'rs_swipe', checked: true,
              }, {
                label: 'Chip', value: 'rs_chip', checked: true,
              }, {
                label: 'Contact Less', value: 'rs_cl', checked: true,
              }
            ],
          }, {
            id: 'paymentType',
            label: 'Payment Types', helperText: 'Choose the payment type',
            options: [
              {
                label: 'Card', value: 'pt_card', text: 'CARD',
              }, {
                label: 'Key In', value: 'pt_keyin', text: 'KEYIN',
              }, {
                label: 'Check', value: 'pt_check', text: 'CHECK',
              }, {
                label: 'Cash', value: 'pt_cash', text: 'CASH',
              }
            ],
          },
          ]
      },
      generatedJS: 'empty'
    }
    this.setupPPH = this.setupPPH.bind(this);
    this.renderCheckboxes = this.renderCheckboxes.bind(this);
    this.renderSelectionGroup = this.renderSelectionGroup.bind(this);
    this.showSetup = this.showSetup.bind(this);
    this.showTransactionSteps = this.showTransactionSteps.bind(this);
    this.renderCode = this.renderCode.bind(this);
    this.runCode = this.runCode.bind(this);
  }

  onCheckboxChange(event) {
    this.setState({
      checkboxes: this.state.data.checkboxes.map((checkbox) => {
        if(checkbox.id === event.target.id) {
          checkbox.checked = event.target.checked;
        }
      }),
    });
    this.renderCode();
  }

  callCodeGenDropdown(event) {
    this.setState({
      selections: this.state.data.selections.map((selection, index) => {
        selection.value = selection.id === event.target.id ? event.target.value : selection.value || '';
        return selection;
      }),
    });
    this.renderCode();
  }

  renderCheckboxes() {
    const self = this;
    const {checkboxes} = this.state.data;
    return checkboxes
    .map((checkbox, index) => <Checkbox
      key={index}
      label={checkbox.text}
      name={checkbox.id}
      id={checkbox.id}
      onChange={self.onCheckboxChange.bind(self)} />
    );
  }

  renderDropdown() {
    const self = this;
    return this.state.data.selections.map((dropdownOptions, index) => <Dropdown
      label={dropdownOptions.label}
      helperText={dropdownOptions.helperText}
      placeholder=""
      id={dropdownOptions.id}
      options={dropdownOptions.options}
      value={dropdownOptions.value}
      onChange={self.callCodeGenDropdown.bind(self)}
      />
    );
  }

  checkSelectionGroup(event) {
    this.setState({
      selectionGroup: this.state.data.selectionGroup.map(selection => {
        if(selection.id === event?.target?.id) {
          selection.checked = event.target.checked;
        }
        return selection;
      })
    });
    this.renderCode();
  }

  renderSelectionGroup() {
    const self = this;
    const {selectionGroup} = this.state.data;
    return <MultiSelectionGroup
      label="Select event handlers"
      helperText="select all that are required"
      align="justify"
      options={
        selectionGroup
      }
      onChange={self.checkSelectionGroup.bind(self)}
    />
  }

  loadPPHScript() {
    const script = document.createElement("script");

    script.src = "https://localhost:5001/pph/js/pphwebsdk.min.js";
    script.async = true;

    document.body.appendChild(script);
  }

  setupPPH() {
    this.loadPPHScript();
    setTimeout(() => {
      try {
        pphwebsdk.Setup.isSetupComplete().then(function () {
          document.getElementById('setupButton').classList.add('pp-link__done');
        }).catch(function (err) {
          pphwebsdk.Setup.startUIFlow(function (err) {
            document.getElementById('setupButton').classList.remove('pp-link__err');
            document.getElementById('setupButton').classList.add('pp-link__done');
          });
          document.getElementById('setupButton').classList.add('pp-link__err');
        });
      } catch(e) {
        document.getElementById('setupButton').classList.remove('pp-link');
        document.getElementById('setupButton').classList.add('pp-link__err');
      }
    }, 500);
  }

  showSetup() {
    document.getElementById('initialSetup').style.display = 'block';
    document.getElementById('paymentSteps').style.display = 'none';
    this.setState({
      generatedJS: '\\\\Returns a Promise of whether the setup is complete or not \n' +
        'pphwebsdk.Setup.isSetupComplete().then(function () {\n' +
        '\tconsole.log(\'setup complete\');\n'+
        '}).catch(function (err) {\n' +
        '\tconsole.log(err);\n\n' +
        '\t\\*Starts the UI Flow to download, setup and \n' +
        '\t *test the Web Interface \n' +
        '\t *\/\n' +
        '\tpphwebsdk.Setup.startUIFlow(function (err) {\n' +
        '\t\tconsole.log(\'done with setup\');\n' +
        '\t});\n' +
        '});\n'
    });
  }

  showTransactionSteps() {
    document.getElementById('initialSetup').style.display = 'none';
    document.getElementById('paymentSteps').style.display = 'block';
    this.renderCode();
  }

  getPaymentTypeCode(state) {
    const temp = state.data.selections.find(selection => selection.id === 'paymentType').
    options.
    find(option => state.data.selections.find(selection => selection.id === 'paymentType').value ===
      option.value)
    if(temp) return `\t.as(pphwebsdk.Types.PaymentMethod.${temp.text})\n`;
    else return '';
  }

  renderCode() {
    const self = this;
    this.setState({
      generatedJS: '// Adding Event Handlers\n' +
        'const eventhandler = {' +
        `${self.state.data.selectionGroup.map((selection) => {
          if(selection.checked) return `\n\t${selection.name}: function (${selection.functionParam}) {\n` + 
            `\t\talert(${selection.alertText});\n` +
            '\t}';
        }).join('')}\n` +
        '};\n' + '\n' + '// Creating Identity\n' +
        'const identity = pphwebsdk.Identity.create(\'@access_token\')\n' +
        '\t\t\t\t.environment(\'@environment\')\n' +
        '\t\t\t\t.refreshUrl(\'@refreshUrl\');\n' + '\n' + '\n' +
        '// Creating Payment Configuration\n' + 'var payment_config = pphwebsdk.PaymentConfiguration.create();\n' +
        '\n' + '// Subscribing Events\n' + 'payment_config.subscribeEvents(eventhandler);\n' + '\n' +
        `${self.state.data.checkboxes.map((checkbox) => {
          if(checkbox.checked) {
            return `${checkbox.commentString}\n${checkbox.api('payment_config')}\n`
          }
        }).join('')}` +
        '\n' + '// Create Order\n' +
        'var order = pphwebsdk.Order.create();\n' + 'order.item(\"Test Item\").price(\"@amount\").quantity(1);\n' +
        'order.tip(\"@tip\");\n' + '\n' + '//Making Payments\n' + 'var payment = pphwebsdk.Payment\n' +
        '        .create(identity, payment_config)\n' + '        .for(order)\n' +
        `${self.getPaymentTypeCode(self.state)}` + '        .sale();\n'
    });
    this.forceUpdate();
  }

  runCode() {
    const s = document.createElement('script');
    s.type = 'text/javascript';
    s.async = true;
    s.innerHTML = `(function (){${this.state.generatedJS}})();`;
    console.log(document.getElementsByTagName('head')[0]);
    document.getElementsByTagName('head')[0].appendChild(s);
  }

  render() {
    const self = this;
    return(
      <Container fluid={true} className={'ppContainer'}>
        <Row className={'ppRow'} >
          <Col>
            <Icon size={'xl2'} name={'logo-paypal'} className={'pp-title pp-icon'} as={'div'} />
          </Col>
          <Col>
            <Text size={'xl2'} className={'pp-title'}>PayPal Here SDK Sample App</Text>
          </Col>
        </Row>
        <Row className={'ppBordered'}>
          <Col className={'ppSidebar'} md={2}>
            <ul style={{'listStyleType':'none'}}>
              <li key={'initialSetup'} onClick={self.showSetup}>
                <Text size={'xl'} >Setup PPH</Text>
              </li>
              <li key={'paymentSteps'} onClick={self.showTransactionSteps}>
                <Text size={'xl'} >Take A Payment</Text>
              </li>
            </ul>
          </Col>
          <Col className={'ppBordered'}>
            <div id={'initialSetup'} hidden>
              <Tile divider>
                <Tile.Header size={'xl2'}>Setting up PPH Web SDK</Tile.Header>
                <Tile.Content>
                  <Text>
                    This is a one time setup to install the supporting web interface app required for PPH Web SDK
                  </Text>
                </Tile.Content>
                <Tile.Footer>
                  <Button size="lg" id={'setupButton'} className={'pp-link'} onClick={self.setupPPH}>Setup PPH</Button>
                </Tile.Footer>
              </Tile>
            </div>
            <div id={'paymentSteps'} hidden>
            {self.renderDropdown()}
            {self.renderCheckboxes()}
            {self.renderSelectionGroup()}
              <Button size={'lg'} id={'runCode'} className={'pp-link'} onClick={self.runCode}>Try It Out</Button>
            </div>
          </Col>
          <Col className={'pp-code-container'}>
            <div id={'code'} className={'pp-code'}><pre>{this.state.generatedJS}</pre></div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default hot(module)(App);
