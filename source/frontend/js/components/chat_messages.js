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
            return(
                <li className="messages--message">
                    {item.username} wrote at:
                    { ' ' + new Date(item.date).toLocaleTimeString()}
                    - {item.message}
                </li>
            );
        });
    }

    componentDidMount() {
        ChatStore.addChangeListener(function(){
            this.forceUpdate();
        }.bind(this));
    }

    componentWillUnmount() {
        ChatStore.removeChangeListener();
    }

    render() {
        return(
            <div>
                Currently in Room {RoomStore.getCurrentRoom().name}
                <ul ref="messages">
                    {this._formatMessages()}
                </ul>
            </div>
        );
    }
}

export default ChatMessages;