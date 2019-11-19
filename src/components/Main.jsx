import React from "react";

import SideBar from './SideBar';
import Content from './Content';
import View from './View';

import { Container, Row } from 'pp-react';



function Main(props) {
    return (
       <Row className={'main'}>
          <SideBar />
          <Content data={props.data}/>
       </Row>
    )
}


export default Main;