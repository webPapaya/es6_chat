"use strict";

import React      from 'react';

// Components
import ChatInput  from './chat_input';
import ChatThread from './chat_thread';

// Actions
import AppActions from '../actions/app_actions';



class ChatWindow extends React.Component {
    _addMessage(value) {
        AppActions.handleMessage(value);
    }

    render() {
        return(
            <div>
                <ChatInput
                    submitCallback={this._addMessage.bind(this)}
                />
                <ChatThread />
            </div>
        );
    }
}

export default ChatWindow;
