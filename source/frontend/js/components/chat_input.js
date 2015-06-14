"use strict";

import React      from 'react';
import Radium     from 'radium';
import ChatButton from './chat_input';
import ChatStore  from '../stores/chat_store';
import AppActions from '../actions/app_actions';
import colors     from '../styles/colors';

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

    getLabel() {
        let label;
        if(this.props.label) {
            label = (
                <label
                    for={this.props.label}
                    className="chat-input--label"
                >
                    {this.props.label}
                </label>
            )
        }
        return label;
    }

    render() {
        return(
            <div className="chat-input--all">
                {this.getLabel()}
                <div className="chat-input--wrp">
                    <input
                        className="chat-input--input"
                        id={this.props.label}
                        type="text"
                        onChange={this._inputChange.bind(this)}
                        onKeyDown={this._send.bind(this)}
                        value={this.state.value}
                    />

                    <button
                        className="chat-input--button"
                        onClick={this._submit.bind(this)}
                    >
                        Senden
                    </button>
                </div>
            </div>
        );
    }
}

export default ChatInput;
