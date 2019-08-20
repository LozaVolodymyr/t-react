import React, { Component } from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { hot } from "react-hot-loader";
import { Container, Row, Col, Text, Icon, Checkbox, MultiSelectionGroup, Dropdown, Tile, Button, TextInput } from 'pp-react';

import "./App.css";


import Header from './components/Header';
import Main from './components/Main';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = props.data;


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
        if (checkbox.id === event.target.id) {
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
    const { checkboxes } = this.state.data;
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
        if (selection.id === event ?.target ?.id) {
          selection.checked = event.target.checked;
        }
        return selection;
      })
    });
    this.renderCode();
  }

  renderSelectionGroup() {
    const self = this;
    const { selectionGroup } = this.state.data;
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
        }).catch(function (err) {
          pphwebsdk.Setup.startUIFlow(function (err) {
            document.getElementById('setupButton').classList.remove('pp-link__err');
            document.getElementById('setupButton').classList.add('pp-link__done');
          });
          document.getElementById('setupButton').classList.add('pp-link__err');
        });
      } catch (e) {
        document.getElementById('setupButton').classList.remove('pp-link');
        document.getElementById('setupButton').classList.add('pp-link__err');
      }
    }, 500);
  }

  genFun(element, key) {
    if (element.key === key) {
      return {
        find: (element, index) => index === 0, filter: ((element, index) => index !== 0)
      };
    }
    else if (element.listItems ?.find(element => element.key === key)) {
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
          if (element.key === key || element.listItems ?.find(element => element.key === key)) {
            element.classes.add('pp-sidebar-option-selected');
            element.listItems ?.find(self.genFun(element, key) ?.find).classes.add('pp-sidebar-option-selected');
            element.listItems ?.filter(self.genFun(element, key) ?.filter) ?.map(element => element ?.classes.delete('pp-sidebar-option-selected'))
          }
          else {
            element.classes.delete('pp-sidebar-option-selected');
            element.listItems ?.map(element => element.classes.delete('pp-sidebar-option-selected'))
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
        if (element.key === event.target.name) {
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
            rightIcon={<Icon size="xs" name="info-alt" />}
            onChange={self.identityTextChange.bind(self)}
          />
        </Tile.Content>
      </Tile>
    });
  }

  orderOptionsTextChange(event) {
    this.setState({
      orderOptions: this.state.data.orderOptions.map((element) => {
        if (element.key === event.target.name) {
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
            rightIcon={<Icon size="xs" name="info-alt" />}
            onChange={self.orderOptionsTextChange.bind(self)}
          />
        </Tile.Content>
      </Tile>
    });
  }

  genSidebar(sidebarElements) {
    return sidebarElements ? <ul className={'pp-list'}>
      {sidebarElements ?.map((element, index) =>
        <li key={element.key}>
          <Text id={element.key} className={[...element.classes].join(' ')} size={'xl'} onClick={this.handleSidebarClick.bind(this, element.key)}>{element.text}</Text>
          {this.genSidebar(element.listItems)}
        </li>)}
    </ul> : undefined
  }

  showSetup() {
    document.getElementById('initialSetup').style.display = 'block';
    document.getElementById('paymentSteps').style.display = 'none';
    this.setState({
      generatedJS: '\\\\Returns a Promise of whether the setup is complete or not \n' +
        'pphwebsdk.Setup.isSetupComplete().then(function () {\n' +
        '\tconsole.log(\'setup complete\');\n' +
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
    if (temp) return `\t.as(pphwebsdk.Types.PaymentMethod.${temp.text})\n`;
    else return '';
  }

  renderCode() {
    const self = this;
    this.setState({
      generatedJS: '// Adding Event Handlers\n' +
        'const eventhandler = {' +
        `${self.state.data.selectionGroup.filter(selection => selection.checked) ?.map((selection) => `\n\t${selection.name}: function (${selection.functionParam}) {\n` +
          `\t\talert(${selection.alertText});\n` +
          '\t}').join(',')}\n` +
        '};\n' + '\n' + '// Creating Identity\n' +
        `const identity = pphwebsdk.Identity.create('${self.state.data.identity.find((element => element.key === 'access_token')) ?.value}')\n` +
        `\t\t\t\t.environment('${self.state.data.identity.find((element => element.key === 'environment')) ?.value}')\n` +
        `\t\t\t\t.refreshUrl('${self.state.data.identity.find((element => element.key === 'refresh_url')) ?.value}');\n` + '\n' + '\n' +
        '// Creating Payment Configuration\n' + 'const payment_config = pphwebsdk.PaymentConfiguration.create();\n' +
        '\n' + '// Subscribing Events\n' + 'payment_config.subscribeEvents(eventhandler);\n' + '\n' +
        `${self.state.data.checkboxes.map((checkbox) => {
          if (checkbox.checked) {
            return `${checkbox.commentString}\n${checkbox.api('payment_config')}\n`
          }
        }).join('')}` +
        '\n' + '// Create Order\n' +
        'var order = pphwebsdk.Order.create();\n' + `order.item("Test Item\").price('${self.state.data.orderOptions.find((element => element.key === 'amount')) ?.value}').quantity(1);\n` +
        `order.tip('${self.state.data.orderOptions.find((element => element.key === 'tip')) ?.value}');\n` + '\n' + '//Making Payments\n' + 'var payment = pphwebsdk.Payment\n' +
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

  // <SideBar sidebar={self.state.data.sidebar}/>

  render() {
    return (
      <Router>
        <div className={'wrapper'}>
          <Header />
          <Main data={this.state.data}/>
        </div>
      </Router>
    );
  }
}

export default hot(module)(App);


{/* <Row className={'ppBordered'}>
      
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
              <Button size="lg" id={'setupButton'} className={'pp-link'} onClick={(event) => { console.log('inside click'); console.log(this); console.log(self); self.setupPPH(event) }}>Setup PPH</Button>
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
    </Row> */}