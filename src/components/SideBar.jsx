import React from "react";
import { Link } from 'react-router-dom';
import { Container, Row, Col, Text, Icon, Checkbox, MultiSelectionGroup, Dropdown, Tile, Button, TextInput } from 'pp-react';


function SideBar() {
    return (
        <Col sm={2} className={'box sidebar'}>
            <ul>
                {routs.map(({ path, title, id }, index) => {
                    return <li key={index}><Link to={path} id={id} className={`tip-nav ${index === 0 ? '' : 'isDisabled'}`}> {title} </Link></li>
                })
                }
            </ul>
        </Col>
    )
}


const routs = [
    {
        path: '/',
        title: 'Setup PPH',
        id: 'setupPPH'
    },
    {
        path: '/merchant-identity',
        title: 'Merchant Identity',
        id: 'merchantIdentity'
    },
    {
        path: '/take-payments',
        title: 'Take Payments',
        id: 'takePayments'
    },
    {
        path: '/payment-options',
        title: 'Payment Options',
        id: 'paymentOptions'
    },
    {
        path: '/subsribe-events',
        title: 'Subsribe Events',
        id: 'subsribeEvents'
    }
]


export default SideBar;
