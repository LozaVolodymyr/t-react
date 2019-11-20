import React from "react";
import { Button } from 'pp-react';


class NextButton extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <Button size="md" name={this.props.name} id={'nextButton'} className={`pp-link ${this.props.isDisabled ? 'isDisabled' : ''}`} onClick={(event) => { this.props.next({ event, history: this.props.history}) }}>Next</Button>
        )
    }
    
}

export default NextButton;
