"use strict";

import React      from 'react';
import ChatButton from './chat_input';
import RoomStore  from '../stores/room_store';
import AppActions from '../actions/app_actions';
import Router from 'react-router';

var { Link } = Router;

class ChatInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {rooms: RoomStore.getRooms()};
    }

    _roomAdded() {
        this.setState({rooms: RoomStore.getRooms()});
    }

    componentDidMount() {
        RoomStore.addChangeListener(this._roomAdded.bind(this));
    }

    componentWillUnmount() {
        RoomStore.removeChangeListener();
    }

    _formatRooms() {
        return this.state.rooms.map(function(item) {
            return(
                <li>
                    <Link to="chatRoom" params={{id: item.id}}>
                        {item.name}
                    </Link>
                </li>
            )
        });
    }

    render() {
        return(
            <div>
                {this._formatRooms()}
            </div>
        );
    }
}

export default ChatInput;
