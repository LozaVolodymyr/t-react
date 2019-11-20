import React from "react";
import { Route, Switch, Redirect } from 'react-router-dom';
import { Col } from 'pp-react';

import Setup from '../pages/Setup'
import Identity from '../pages/Identity'
import Events from '../pages/Events'
import Payments from '../pages/Payments'

import templates from '../data/templates'


class Content extends React.Component {
    constructor(props){
        super(props);
        this.routes = props.routes;
    }

    render(){
        return (
            <Col className={'box content'}>
                <Switch>
                    <Route exact path={this.routes.setup.path} render={routeProps => 
                    <Setup 
                    {...routeProps}
                    identity={this.props.data.identity} 
                    next={this.props.next}
                    template={templates.setup}/>} />
                    <Route path={this.routes.identity.path} render={routeProps => 
                    <Identity 
                    {...routeProps}
                    identity={this.props.data.identity} 
                    next={this.props.next}
                    template={templates.identity}/>} />
                    <Route path={this.routes.payments.path} render={routeProps => 
                    <Payments
                    {...routeProps}
                    payment={this.props.data.payment} 
                    next={this.props.next}
                    template={templates.payments} />} />
                    <Route path={this.routes.events.path} render={routeProps => 
                    <Events 
                    {...routeProps}
                    next={this.props.next}
                    template={templates.events}
                    selectionGroup={this.props.data.selectionGroup} />} />
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