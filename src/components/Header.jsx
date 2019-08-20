import React from "react";
import { Icon } from 'pp-react';

const divColum = {
    float: 'left',
};
const divColumCenter = {
    float: 'left',
    margin: 'auto'
};


function Header() {
    return (
        <div className={'header'}>
            <Icon size={'xl2'} name={'logo-paypal'} style={divColum} as={'div'} > </Icon>
            <div style={divColumCenter}>
                <p className={'pp-title'}>
                    PayPal Here SDK Sample App
                </p>
            </div>
        </div>

    )
}

export default Header;

