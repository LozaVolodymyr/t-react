import React from "react";
import { Route, Switch, Redirect } from 'react-router-dom';

import Setup from '../pages/Setup'
import Indentity from '../pages/Indentity'
import Options from '../pages/Options'
import Events from '../pages/Events'
import Payments from '../pages/Payments'

function Content(props) {
    return (
        <div className={'box content'}>
            <Switch>
                <Route exact path='/' component={Setup} />
                <Route path='/merchant-indentity' render={() => <Indentity identity={props.data.identity} />} />
                <Route path='/take-payments' render={() => <Payments identity={props.data.identity} />} />
                <Route path='/payment-options' render={() => <Options orderOptions={props.data.orderOptions} />} />
                <Route path='/subsribe-events' render={() => <Events identity={props.data.identity} />} />
                <Redirect to="/" />
            </Switch>

        </div>
    )
}


export default Content;



// <div>
// <Route exact path='/' component={Home} />

// </div>