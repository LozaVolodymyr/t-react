import React from "react";
import { Route, Switch, Redirect, RefreshRoute } from 'react-router-dom';
import { Container, Row, Col, Text, Icon, Checkbox, MultiSelectionGroup, Dropdown, Tile, Button, TextInput } from 'pp-react';

import Setup from '../pages/Setup'
import Indentity from '../pages/Indentity'
import Options from '../pages/Options'
import Events from '../pages/Events'
import Payments from '../pages/Payments'

import view from '../data/view';

class Content extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            view
        };

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
                    <Route exact path='/' component={Setup} />
                    {/* <Route path='/' render={() => <Setup identity={this.props.data.identity} />} /> */}
                    <Route path='/merchant-indentity' render={() => <Indentity identity={this.props.data.identity} />} />
                    <Route path='/take-payments' render={() => <Payments payment={this.props.data.payment} view={this.state.view} updateView={this.updateView} />} />
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