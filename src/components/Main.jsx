import React from "react";
import SideBar from './SideBar';
import Content from './Content';

import { Row } from 'pp-react';

import routes from '../data/routes'

class Main extends React.Component {
   constructor(props) {
      super(props)
      this.state = {
         routes: routes
      }
      this.next = this.next.bind(this);
   }
   
   next({ event, history }){
      const { name } = event.target;
      const currentStep = this.state.routes[name];
      const nextKey = this.nextKey(this.state.routes, name);
      this.state.routes[nextKey].isDisabled = false;
      this.setState(this.state);
      history.push(this.state.routes[nextKey].path);


      // Style for NavsBars
      document.getElementById(currentStep.id).classList.add('pp-link__done');
      // ADD PROGRESS BAR LOGIC
      
   }

   nextKey(db, key){
      const keys = Object.keys(db)
      const i = keys.indexOf(key);
      return keys[i+1]
   }

   render() {
      return (
         <Row className={'main'}>
            <SideBar routes={this.state.routes} />
            <Content data={this.props.data} routes={this.state.routes} next={this.next} />
         </Row>
      )
   }
}


export default Main;