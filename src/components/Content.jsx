import React from "react";
import { Route, Switch, Redirect, RefreshRoute } from 'react-router-dom';
import { Container, Row, Col, Text, Icon, Checkbox, MultiSelectionGroup, Dropdown, Tile, Button, TextInput } from 'pp-react';

import Setup from '../pages/Setup'
import Identity from '../pages/Identity'
import Options from '../pages/Options'
import Events from '../pages/Events'
import Payments from '../pages/Payments'

import templates from '../data/templates'
// import view from '../data/view';

class Content extends React.Component {
    constructor(props){
        super(props);
        
        console.log('Content==>', props)

        this.updateView = this.updateView.bind(this);
    }
    updateView(event){
        console.log('KEK', this.state)
        this.setState({
            view: view + "NEW CONTENT"
        }, ()=> this.forceUpdate())
    }

    render(){
        return (
            <Col className={'box content'}>
                <Switch>
                    {/* <Route exact path='/' component={Setup} /> */}
                    <Route exact path='/' render={() => <Setup identity={this.props.data.identity} template={templates.setup}/>} />
                    <Route path='/merchant-identity' render={() => <Identity identity={this.props.data.identity} template={templates.identity}/>} />
                    <Route path='/take-payments' render={() => <Payments payment={this.props.data.payment} template={templates.payment} updateView={this.updateView} />} />
                    <Route path='/payment-options' render={() => <Options orderOptions={this.props.data.orderOptions} />} />
                    <Route path='/subsribe-events' render={() => <Events identity={this.props.data.identity} />} />
                    <Redirect to="/" />
                </Switch>
            </Col>
        )
    }
    
}


export default Content;



// <div>
// <Route exact path='/' component={Home} />

// </div>