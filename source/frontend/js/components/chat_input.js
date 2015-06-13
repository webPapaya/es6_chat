"use strict";

import React      from 'react';
import Radium     from 'radium';
import ChatButton from './chat_input';
import ChatStore  from '../stores/chat_store';
import AppActions from '../actions/app_actions';
import colors     from '../styles/colors';

const ENTER_KEY_CODE = 13;

let styles = {
    base: {
        border:             'none',
        padding:            '7px 10px'
    },
    button: {
        background:         colors.primary,
        border:             `1px solid ${colors.primary}`,
        color:              colors.white,
        borderBottomRightRadius:  5,
        borderTopRightRadius: 5,
        ':hover':  {
            border:     `1px solid ${colors.primaryHover}`,
            background: colors.primaryHover
        }
    },
    input: {
        outline: 0,
        border:                  `1px solid ${colors.lightGray}`,
        borderBottomLeftRadius:  5,
        borderTopLeftRadius:     5
    }
};

@Radium
class ChatInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
        console.log('test')
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
                <label for={this.props.label}>
                    {this.props.label}
                </label>
            )
        }
        return label;
    }

    render() {
        return(
            <div>
                {this.getLabel()}
                <input
                    id={this.props.label}
                    style={[styles.base, styles.input]}
                    type="text"
                    onChange={this._inputChange.bind(this)}
                    onKeyDown={this._send.bind(this)}
                    value={this.state.value}
                />

                <button
                    onClick={this._submit.bind(this)}
                    style={[styles.base, styles.button]}
                >
                    Senden
                </button>
            </div>
        );
    }
}

export default ChatInput;
