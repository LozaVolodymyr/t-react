import React from "react";

import SideBar from './SideBar';
import Content from './Content';
import View from './View';


function Main(props) {
    return (
       <div className={'main'}>
          <SideBar />
          <Content data={props.data}/>
          <View />
       </div>
    )
}


export default Main;



// <div>
// <Route exact path='/' component={Home} />
// <Route path='/take-payments' component={Payments} />
// <Route path='/merchant-indentity' component={Indentity} />
// <Route path='/payment-options' component={Options} />
// <Route path='/subsribe-events' component={Events} />
// </div>