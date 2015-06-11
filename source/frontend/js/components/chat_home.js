"use strict";

import React      from 'react';

// Components
import ChatInput  from './chat_input';
import ChatRooms  from './chat_rooms';

// Actions
import AppActions from '../actions/app_actions';
import ChatStore  from '../stores/chat_store';

class ChatWindow extends React.Component {
    constructor (props) {
        super(props);
        this.state = {name: ChatStore.getUserName()};
    }

    componentDidMount() {
        ChatStore.addChangeListener(this._nameChanged.bind(this));
    }

    componentWillUnmount() {
        ChatStore.removeChangeListener();
    }

    _nameChanged() {
        this.setState({name: ChatStore.getUserName()});
    }

    changeName(payload) {
        AppActions.changeUserName(payload);
    }

    render() {
        return(
            <div className="home">
                <ChatInput
                    label="Username: "
                    submitCallback={this.changeName.bind(this)}
                />
                <ChatRooms />
            </div>
        );
    }
}

export default ChatWindow;
