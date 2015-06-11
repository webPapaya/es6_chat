"use strict";

import React      from 'react';
import ChatStore  from '../stores/chat_store';
import RoomStore  from '../stores/room_store'
import RoomList   from '../components/chat_room_list'

class ChatMessages extends React.Component {
    _getMessages() {
        return ChatStore.getMessages(this.props.roomId)
    }

    _formatMessages() {
        return this._getMessages().map(function(item) {
            return <li>{new Date(item.date).toLocaleTimeString()} - {item.message}</li>
        });
    }

    render() {
        return(
            <div>
                Currently in Room {RoomStore.getCurrentRoom()}
                <ul>
                    {this._formatMessages()}
                </ul>
            </div>
        );
    }
}

export default ChatMessages;