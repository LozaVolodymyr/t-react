import React from "react";
import { Link } from 'react-router-dom';
import { Col } from 'pp-react';


function SideBar({ routes }) {
    return (
        <Col sm={2} className={'box sidebar'}>
            <ul>
                {Object.keys(routes).map((key, index) => {
                    return <li key={index}><Link to={routes[key].path} id={routes[key].id} className={`tip-nav ${routes[key].isDisabled ? 'isDisabled': ''}`}> {routes[key].title} </Link></li>
                })
                }
            </ul>
        </Col>
    )
}

export default SideBar;
