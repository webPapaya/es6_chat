"use strict";

import React      from 'react';

// Components
import ChatInput    from './chat_input';
import ChatMessages from './chat_messages';
import ChatRooms    from './chat_rooms';

// Actions
import AppActions from '../actions/app_actions';
import RoomStore  from '../stores/room_store';
import ChatStore  from '../stores/chat_store';

class ChatWindow extends React.Component {
    static willTransitionTo (transition, params) {
        AppActions.changeRoom(parseInt(params.id));
    }

    _addMessage(value) {
        AppActions.handleMessage(this.props.params.id, value);
    }

    render() {
        return(
            <div className="col-group">
                <div className="col-9">
                    <ChatInput
                        label="Message: "
                        submitCallback={this._addMessage.bind(this)}
                    />
                    <ChatMessages
                        roomId={RoomStore.getCurrentRoom()}
                    />
                </div>
                <div className="col-3">
                    <ChatRooms />
                </div>
            </div>
        );
    }
}

export default ChatWindow;
