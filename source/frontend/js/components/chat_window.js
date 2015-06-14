"use strict";

import React      from 'react';

// Components
import ChatInput    from './chat_input';
import ChatMessages from './chat_messages';
import ChatRooms    from './chat_rooms';

// Actions
import AppActions    from '../actions/app_actions';
import SocketActions from '../actions/socket_actions';
import RoomStore     from '../stores/room_store';
import ChatStore     from '../stores/chat_store';

class ChatWindow extends React.Component {
    static willTransitionTo (transition, params) {
        SocketActions.changeRoom(params.id);
    }

    _addMessage(value) {
        SocketActions.handleMessage(this.props.params.id, value);
    }

    render() {
        return(
            <div className="col-group">
                <div className="col-8 chat-window--wrp">
                    <div className="chat-window--messages">
                        <ChatMessages
                            roomId={RoomStore.getCurrentRoom().id}
                        />
                    </div>
                    <div className="chat-window--input">
                        <ChatInput
                            label="Message: "
                            submitCallback={this._addMessage.bind(this)}
                        />
                    </div>
                </div>
                <div className="col-2 room-list--wrp">
                    <ChatRooms />
                </div>
            </div>
        );
    }
}

export default ChatWindow;
