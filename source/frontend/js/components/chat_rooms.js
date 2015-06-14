"use strict";

import React         from 'react';
import Router        from 'react-router';

import ChatStore     from '../stores/chat_store';
import AppActions    from '../actions/app_actions';
import SocketActions from '../actions/socket_actions';
import ChatInput     from '../components/chat_input';
import RoomList      from '../components/chat_room_list';
import RoomStore     from '../stores/room_store';

let { Redirect } = Router;

class Component extends React.Component {
    _addRoom(name) {
        SocketActions.addChatRoom(name);
    }

    render() {
        return(
            <div>
                <ChatInput
                    label="Add Chat Room: "
                    submitCallback={this._addRoom.bind(this)}
                />
                <RoomList />
            </div>
        );
    }
}

export default Component;
