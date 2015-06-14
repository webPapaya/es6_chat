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
                <li className="message--wrp">
                    <div className="messages--message">
                        {item.message}
                    </div>
                    <div className="messages--meta">
                        {item.username} wrote at:
                        { ' ' + new Date(item.date).toLocaleTimeString()}
                    </div>
                </li>
            );
        });
    }

    componentDidMount() {
        this.componentDidUpdate();
        ChatStore.addChangeListener(function(){
            this.forceUpdate();
        }.bind(this));
    }

    componentWillUnmount() {
        ChatStore.removeChangeListener();
    }

    componentDidUpdate() {
        let messages = document.querySelectorAll('.chat-window--messages')[0];
        messages.scrollTop = messages.scrollHeight;
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