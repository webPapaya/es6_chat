"use strict";

import React      from 'react';
import ChatButton from './chat_input';
import ChatStore  from '../stores/chat_store';
import AppActions from '../actions/app_actions';

const ENTER_KEY_CODE = 13;

class ChatInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
    }

    _submit () {
        this.props.submitCallback(this.state.value);
        this.setState({value: ''});
    }


    _inputChange(evt) {
        this.setState({value: evt.target.value});
    }

    _send(evt) {
        if(evt.keyCode === ENTER_KEY_CODE) {
            this._submit();
        }
    }

    render() {
        return(
            <div>
                <input
                    type="text"
                    onChange={this._inputChange.bind(this)}
                    onKeyDown={this._send.bind(this)}
                    value={this.state.value}
                />
                <button onClick={this._submit.bind(this)}>
                    Senden
                </button>
            </div>
        );
    }
}

export default ChatInput;
