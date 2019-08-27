import React from "react";
import Highlight from 'react-highlight'

class View extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className={'box-content sidebar-right'}>
                <div>
                    <Highlight language="javascript">
                        <div>{this.props.view}</div>
                    </Highlight>
                </div>
            </div>
        )
    }
    
}


export default View;
