"use strict";

import React      from 'react';
import ChatStore  from '../stores/chat_store';
import AppActions from '../actions/app_actions';

class ChatThread extends React.Component {
    constructor(props) {
        super(props);
        this.state = {messages: ChatStore.getMessages()};
    }

    componentDidMount() {
        ChatStore.addChangeListener(this._newMessage.bind(this));
    }

    componentWillUnmount() {
        ChatStore.removeChangeListener();
    }

    _newMessage() {
        this.setState({
            messages: ChatStore.getMessages()
        });
    }

    _formatMessages() {
        return this.state.messages.map(function(item) {
            return <li>{item.date.toLocaleTimeString()} - {item.message}</li>
        });
    }

    render() {
        return(
            <ul>
                {this._formatMessages()}
            </ul>
        );
    }
}

export default ChatThread;