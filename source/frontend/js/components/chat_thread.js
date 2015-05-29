"use strict";

import React      from 'react';
import ChatStore  from '../stores/chat_store';
import AppActions from '../actions/app_actions';

class ChatThread extends React.Component {
    constructor(props) {
        super(props);
        this.state = {messages: []};
    }

    componentDidMount() {
        ChatStore.addChangeListener(this._newMessage.bind(this));
    }

    componentWillUnmount() {
        ChatStore.removeListener(this._newMessage.bind(this));
    }

    _newMessage() {
        this.setState({
            messages: ChatStore.getMessages()
        });
    }

    formatMessages() {
        return this.state.messages.map(function(item) {
            return <li>{item.date.toLocaleTimeString()} - {item.message}</li>
        });
    }

    render() {
        return(
            <ul>
                {this.formatMessages()}
            </ul>
        );
    }
}

export default ChatThread;