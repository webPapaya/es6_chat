"use strict";

import React      from 'react';
import ChatButton from './chat_input';
import ChatStore  from '../stores/chat_store';
import AppActions from '../actions/app_actions';

class ChatInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {rooms: ChatStore.getRooms()};
    }

    _roomAdded() {
        this.setState({rooms: ChatStore.getRooms()});
    }

    componentDidMount() {
        ChatStore.addChangeListener(this._roomAdded.bind(this));
    }

    componentWillUnmount() {
        ChatStore.removeChangeListener();
    }

    _formatMessages() {
        return this.state.rooms.map(function(item) {
            return <li>{item.name}</li>
        });
    }

    render() {
        return(
            <div>
                {this._formatMessages()}
            </div>
        );
    }
}

export default ChatInput;
