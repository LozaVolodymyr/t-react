import React from "react";
import { Link } from 'react-router-dom';
import { Container, Row, Col, Text, Icon, Checkbox, MultiSelectionGroup, Dropdown, Tile, Button, TextInput } from 'pp-react';

function SideBar() {
    return (
        <Col sm={2} className={'box sidebar'}>
            <ul>
                {routs.map(({ path, title }, index) => {
                    return <li key={index}><Link to={path} className={`tip-nav ${index === 0 ? '' : 'isDisabled'}`}> {title} </Link></li>
                })
                }
            </ul>
        </Col>
    )
}


const routs = [
    {
        path: '/',
        title: 'Setup PPH'
    },
    {
        path: '/take-payments',
        title: 'Take Payments'
    },
    {
        path: '/merchant-indentity',
        title: 'Merchant Indentity'
    },
    {
        path: '/payment-options',
        title: 'Payment Options'
    },
    {
        path: '/subsribe-events',
        title: 'Subsribe Events'
    }
]


export default SideBar;



// <div>
// <Route exact path='/' component={Home} />
// <Route path='/take-payments' component={Payments} />
// <Route path='/merchant-indentity' component={Indentity} />
// <Route path='/payment-options' component={Options} />
// <Route path='/subsribe-events' component={Events} />
// </div>