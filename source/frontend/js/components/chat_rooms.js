"use strict";

import React      from 'react';
import ChatStore  from '../stores/chat_store';
import AppActions from '../actions/app_actions';
import ChatInput  from '../components/chat_input';
import RoomList   from '../components/chat_room_list';

class Component extends React.Component {
    _addRoom(name) {
        AppActions.addChatRoom(name);
    }


    render() {
        return(
            <div>
                <ChatInput
                    submitCallback={this._addRoom.bind(this)}
                />
                <RoomList />
            </div>
        );
    }
}

export default Component;
