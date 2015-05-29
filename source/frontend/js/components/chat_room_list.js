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

    render() {
        return(
            <div>
                {this.state.rooms}
            </div>
        );
    }
}

export default ChatInput;
