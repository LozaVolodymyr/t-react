import React, { Component} from "react";
import { Route, Redirect } from "react-router-dom";
import { hot } from "react-hot-loader";
import "./App.css";
import { Container, Row, Col, Text, Icon, Checkbox, MultiSelectionGroup, Dropdown, Tile, Button, TextInput } from 'pp-react';


class App extends Component{
  constructor (props) {
    super(props);
    this.state = {
      data: {
        sidebar: [
          {
            key: 'SB_initialSetup',
            text: 'Setup PPH',
            classes: new Set(['pp-sidebar-option', 'pp-link']),
            selected: false,
          },
          {
            key: 'SB_paymentSteps',
            text: 'Take a Payment',
            classes: new Set(['pp-sidebar-option', 'pp-link']),
            selected: false,
            listItems: [
              {
                key: 'SB_identityInfo',
                text: 'Merchant Identity',
                classes: new Set(['pp-sidebar-option', 'pp-link']),
                selected: false,
              },
              {
                key: 'SB_paymentOptions',
                text: 'Payment Options',
                classes: new Set(['pp-sidebar-option', 'pp-link']),
                selected: false,
              },
              {
                key: 'SB_eventHandlers',
                text: 'Subscribe Events',
                classes: new Set(['pp-sidebar-option', 'pp-link']),
                selected: false,
              },
            ]
          },
        ],
        identity: [
          {
            key: 'environment', label: 'Select environment to run on', value: 'fake',
          },
          {
            key: 'access_token', label: 'Access token to authorize payments with', value: '@access_token',
          },
          {
            key: 'client_id', label: 'Client ID to authorize payments with', value: '@client_id',
          },
          {
            key: 'client_secret', label: 'Client Secret to authorize payments with', value: '@client_secret',
          },
          {
            key: 'refresh_url', label: 'Refresh url to refresh access token on expiry', value: '@refresh_url',
          },
        ],
        checkboxes:
          [
            {
              id: 'quickChip',
              text: 'Quick Chip',
              commentString: '// Configure for Quick Chip',
              api: (configObject) => `${configObject}.useQuickChip();`
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
          {
            label: 'Merchant Init Success',
            name: 'onMerchantInitializeSuccess',
            id: 'eh_mis',
            functionParam: 'merchant',
            alertText: '\'merchant logged in!\'',
          },
          {
            label: 'Merchant Init Failure',
            name: 'onMerchantInitializeFailure',
            id: 'eh_mif',
            functionParam: 'err',
            alertText: '\'Merchant Init failed with\' + err',
          },
          {
            label: 'Reader Connection Success',
            name: 'onConnectReaderSuccess',
            id: 'eh_crs',
            functionParam: 'reader',
            alertText: '\'Connected with\' + reader',
          },
          {
            label: 'Reader Connection Failure',
            name: 'onConnectReaderFailure',
            id: 'eh_crf',
            functionParam: 'err',
            alertText: '\'reader connection failed with\' + err',
          },
          {
            label: 'No Devices Found',
            name: 'NoDevicesFound',
            id: 'eh_ndf',
            functionParam: '',
            alertText: '\'No Devices Found\'',
          },
        ],
        orderOptions: [
          {key: 'tags', label: 'Add a tag', value: '@tag',},
          {
            key: 'amount', label: 'Choose item amount', value: '@amount',
          },
          {
            key: 'tip', label: 'Choose tip for order', value: '@tip',
          }
        ],
        selections:
          [
            /*{
              id: 'vaultingOptions',
              label: 'Vault Options', placeholder: 'Enable vaulting', helperText: 'Choose which vault option to enable',
              options: [
                {
                  label: 'Vault Only', value: 'vaultOnly',
                }, {
                  label: 'Vault and Pay', value: 'vap',
                }
              ],
            },*/
            /*{
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
            },*/
            {
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
    this.genSidebar = this.genSidebar.bind(this);
    this.handleSidebarClick = this.handleSidebarClick.bind(this);
    this.renderIdentity = this.renderIdentity.bind(this);
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
    return <Tile divider>
      <Tile.Header size={'xl2'}>Payment Options</Tile.Header>
      <Tile.Content>
        {checkboxes
        .map((checkbox, index) => <Checkbox
        key={index}
        label={checkbox.text}
        name={checkbox.id}
        id={checkbox.id}
        onChange={self.onCheckboxChange.bind(self)} />
        )}
      </Tile.Content>
    </Tile>;
  }

  renderDropdown() {
    const self = this;
    return this.state.data.selections.map((dropdownOptions, index) => <Tile divider>
      <Tile.Header size={'xl2'}>{dropdownOptions.helperText}</Tile.Header>
      <Tile.Content>
        <Dropdown
          key={index}
          label={dropdownOptions.label}
          placeholder=""
          id={dropdownOptions.id}
          options={dropdownOptions.options}
          value={dropdownOptions.value}
          onChange={self.callCodeGenDropdown.bind(self)}
        />
      </Tile.Content>
    </Tile>
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

  setupPPH() {
    setTimeout(() => {
      try {
        pphwebsdk.Setup.isSetupComplete().then(function () {
          document.getElementById('setupButton').classList.add('pp-link__done');
          alert('sdk is setup');
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

  genFun(element, key) {
    if(element.key === key) {
        return {
          find: (element, index) => index === 0, filter: ((element, index) => index !== 0)
        };
    }
    else if (element.listItems?.find(element => element.key === key)) {
        return {
          find: element => element.key === key, filter: element => element.key !== key
        };
    }
  }

  handleSidebarClick(key) {
    const self = this;
    this.setState({
      sidebar: self.state.data.sidebar.map(
        (element) => {
          if(element.key === key || element.listItems?.find(element => element.key === key))
          {
            element.classes.add('pp-sidebar-option-selected');
            element.listItems?.find(self.genFun(element, key)?.find).classes.add('pp-sidebar-option-selected');
            element.listItems?.filter(self.genFun(element, key)?.filter)?.map(element => element?.classes.delete('pp-sidebar-option-selected'))
          }
          else
          {
            element.classes.delete('pp-sidebar-option-selected');
            element.listItems?.map(element => element.classes.delete('pp-sidebar-option-selected'))
          }
        }
      ),
    });
    switch (key) {
      case 'SB_initialSetup':
        this.showSetup();
        break;
      case 'SB_paymentSteps':
      case 'SB_paymentOptions':
        document.getElementById('paymentOptions').style.display = 'block';
        document.getElementById('eventHandlers').style.display = 'none';
        document.getElementById('merchantIdentity').style.display = 'none';
        this.showTransactionSteps();
        break;
      case 'SB_eventHandlers':
        document.getElementById('paymentOptions').style.display = 'none';
        document.getElementById('merchantIdentity').style.display = 'none';
        document.getElementById('eventHandlers').style.display = 'block';
        this.showTransactionSteps();
        break;
      case 'SB_identityInfo':
        document.getElementById('paymentOptions').style.display = 'none';
        document.getElementById('eventHandlers').style.display = 'none';
        document.getElementById('merchantIdentity').style.display = 'block';
        this.showTransactionSteps();
        break;
      default:
        break;
    }
  }

  identityTextChange(event) {
    this.setState({
      identity: this.state.data.identity.map((element) => {
        if(element.key === event.target.name) {
          element.value = event.target.value;
        }
      }),
    });
    this.renderCode();
  }

  renderIdentity() {
    const self = this;
    return self.state.data.identity.map((element, index) => {
      return <Tile divider>
        <Tile.Content>
          <TextInput
            name={element.key}
            value={element.value}
            label={element.key}
            helperText={element.label}
            rightIcon={<Icon size="xs" name="info-alt"/>}
            onChange={self.identityTextChange.bind(self)}
          />
        </Tile.Content>
      </Tile>
    });
  }

  orderOptionsTextChange(event) {
    this.setState({
      orderOptions: this.state.data.orderOptions.map((element) => {
        if(element.key === event.target.name) {
          element.value = event.target.value;
        }
      })
    });
    this.renderCode();
  }

  renderOrderOptions() {
    const self = this;
    return self.state.data.orderOptions.map((element, index) => {
      return <Tile divider>
        <Tile.Content>
          <TextInput
            name={element.key}
            value={element.value}
            label={element.key}
            helperText={element.label}
            rightIcon={<Icon size="xs" name="info-alt"/>}
            onChange={self.orderOptionsTextChange.bind(self)}
          />
        </Tile.Content>
      </Tile>
    });
  }

  genSidebar(sidebarElements) {
    return sidebarElements ? <ul className={'pp-list'}>
      {sidebarElements?.map((element, index) =>
      <li key={element.key}>
        <Text id={element.key} className={[...element.classes].join(' ')} size={'xl'} onClick={this.handleSidebarClick.bind(this, element.key)}>{element.text}</Text>
        {this.genSidebar(element.listItems)}
      </li>)}
    </ul> : undefined
  }

  wrapInDiv(text) {
    return <div>
      <pre>{text}</pre>
    </div>
  }

  showSetup() {
    document.getElementById('initialSetup').style.display = 'block';
    document.getElementById('paymentSteps').style.display = 'none';
    this.setState({
      generatedJS: '\\\\Returns a Promise of whether the setup is complete or not\n' +
        'pphwebsdk.Setup.isSetupComplete().then(function () {\n' +
        'console.log(\'setup complete\');\n' +
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
        `${self.state.data.selectionGroup.filter(selection => selection.checked)?.map((selection) => `\n\t${selection.name}: function (${selection.functionParam}) {\n` +
            `\t\talert(${selection.alertText});\n` +
            '\t}').join(',')}\n` +
        '};\n' + '\n' + '// Creating Identity\n' +
        `const identity = pphwebsdk.Identity.create('${self.state.data.identity.find((element => element.key === 'access_token'))?.value}')\n` +
        `\t\t\t\t.environment('${self.state.data.identity.find((element => element.key === 'environment'))?.value}')\n` +
        `\t\t\t\t.refreshUrl('${self.state.data.identity.find((element => element.key === 'refresh_url'))?.value}');\n` + '\n' + '\n' +
        '// Creating Payment Configuration\n' + 'const payment_config = pphwebsdk.PaymentConfiguration.create();\n' +
        '\n' + '// Subscribing Events\n' + 'payment_config.subscribeEvents(eventhandler);\n' + '\n' +
        `${self.state.data.checkboxes.map((checkbox) => {
          if(checkbox.checked) {
            return `${checkbox.commentString}\n${checkbox.api('payment_config')}\n`
          }
        }).join('')}` +
        '\n' + '// Create Order\n' +
        'var order = pphwebsdk.Order.create();\n' + `order.item(\"Test Item\").price('${self.state.data.orderOptions.find((element => element.key === 'amount'))?.value}').quantity(1);\n` +
        `order.tip('${self.state.data.orderOptions.find((element => element.key === 'tip'))?.value}');\n` + '\n' + '//Making Payments\n' + 'var payment = pphwebsdk.Payment\n' +
        '        .create(identity, payment_config)\n' + '        .for(order)\n' +
        `${self.getPaymentTypeCode(self.state)}` + '        .sale();\n'
    });
  }

  runCode() {
    const s = document.createElement('script');
    s.type = 'text/javascript';
    s.async = true;
    s.innerHTML = `(function (){${this.state.generatedJS}})();`;
    document.getElementsByTagName('head')[0].appendChild(s);
  }

  render() {
    const self = this;
    return(
      <Container fluid={true} className={'ppContainer'}>
        <Row className={'ppRow'} >
          <Col md={2}>
            <Icon size={'xl2'} name={'logo-paypal'} className={'pp-title pp-icon'} as={'div'} />
          </Col>
          <Col style={{'textAlign': 'center'}}>
            <Text size={'xl2'} className={'pp-title'} medium>PayPal Here SDK Sample App</Text>
          </Col>
          <Col className={'pp-icon pp-right-align'} md={2}>
            {/*<Button onClick={self.showLoginModal}>Log In With PayPal</Button>*/}
          </Col>
        </Row>
        <Row className={'ppBordered'}>
          <Col className={'ppSidebar'} sm={2}>
            {self.genSidebar(self.state.data.sidebar)}
          </Col>
          <Col className={'ppBordered'} md={4}>
            <div id={'initialSetup'} hidden>
              <Tile divider>
                <Tile.Header size={'xl2'}>Setting up PPH Web SDK</Tile.Header>
                <Tile.Content>
                  <Text>
                    This is a one time setup to install the supporting web interface app required for PPH Web SDK
                  </Text>
                </Tile.Content>
                <Tile.Footer>
                  <Button size="lg" id={'setupButton'} className={'pp-link'} onClick={(event) => {self.setupPPH(event)}}>Setup PPH</Button>
                </Tile.Footer>
              </Tile>
            </div>
            <div id={'paymentSteps'} hidden>
              <div id={'merchantIdentity'} hidden>
                {self.renderIdentity()}
              </div>
              <div id={'paymentOptions'} hidden>
                {self.renderDropdown()}
                {self.renderCheckboxes()}
                {self.renderOrderOptions()}
              </div>
              <div id={'eventHandlers'} hidden>
                {self.renderSelectionGroup()}
              </div>
              <Tile card>
                <Tile.Header size={'xl'}>Run the genrated to code</Tile.Header>
                <Tile.Content>
                  <Button size={'lg'} id={'runCode'} className={'pp-link'} onClick={self.runCode}>Try It Out</Button>
                </Tile.Content>
              </Tile>
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
