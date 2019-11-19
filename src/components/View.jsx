import React from "react";
import Highlight from 'react-highlight'
import Handlebars from 'handlebars';

class View extends React.Component {
    constructor(props){
        super(props);
        this.data = props.data
        console.log('view props===>', props)

        this.compiler = Handlebars.compile(props.template);
    }
    render(){
        return (
        <Highlight language="javascript">
            { this.compiler(this.data) }
        </Highlight>
        )
    }
    
}

export default View;
