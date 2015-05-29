"use strict";

import React      from 'react';

// Components
import ChatInput  from './chat_input';
import ChatThread from './chat_thread';
import ChatRooms  from './chat_rooms';

// Actions
import AppActions from '../actions/app_actions';



class ChatWindow extends React.Component {
    _addMessage(value) {
        AppActions.handleMessage(value);
    }

    render() {
        return(
            <div className="col-group">
                <div className="col-9">
                    <ChatInput
                        submitCallback={this._addMessage.bind(this)}
                    />
                    <ChatThread />
                </div>
                <div className="col-3">
                    <ChatRooms />
                </div>
            </div>
        );
    }
}

export default ChatWindow;
