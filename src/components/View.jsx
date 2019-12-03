import React from "react";
import {  Row, Col, Checkbox, Icon, Container } from 'pp-react';

import Highlight from 'react-highlight'
import Handlebars from 'handlebars';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {ToastsContainer, ToastsStore} from 'react-toasts';
 
class View extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data:  props.data,
            template: props.template

        }
        console.log(this.props);
        this.compiler = Handlebars.compile(this.state.template);
    }

    render(){
        this.compiledTemplate = this.compiler(this.state.data);
        this.props.codeGenerator({ component: this.props.component, code: this.compiledTemplate})
        return (
            <div>
            <ToastsContainer store={ToastsStore}/>
            <Container>

                <CopyToClipboard text={this.compiledTemplate}
                    onCopy={() => ToastsStore.success("Copied!")}>
                    <Icon className={'copyToClipboard'} size="xs" name="send" />
                </CopyToClipboard>

                { this.props.donwloadFile ? <Icon className={'donwloadButton'} size="xs" name="download" 
                     onClick={(event) => { this.props.donwloadFile({ event }) } } /> : '' }

                { this.props.runCode ? <Icon className={'runCode'} size="xs" name="play" 
                     onClick={(event) => { this.props.runCode({ event }) } }> </Icon> : '' }

                <Highlight language="javascript">
                    {this.compiledTemplate}
                </Highlight>

           </Container>

            </div>

       

        )
    }
    
}

export default View;


