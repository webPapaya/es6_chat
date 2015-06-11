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
        this.state = {
            rooms: RoomStore.getRooms(),
            errors: []
        };
    }

    _roomAdded() {
        this.setState({rooms: RoomStore.getRooms()});
    }

    componentDidMount() {
        RoomStore.addChangeListener(this._roomAdded.bind(this));
        RoomStore.addErrorListener(this._handleError.bind(this));
    }

    componentWillUnmount() {
        RoomStore.removeChangeListener();
        RoomStore.removeErrorListener();
    }

    _handleError(payload) {
        this.state.errors.push(payload);
        this.forceUpdate();
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

    _getErrors() {
        return this.state.errors.map(function() {
            let error = this.state.errors.pop();
            return(<div>{error.message}</div>)
        }.bind(this));
    }

    render() {
        return(
            <div>
                <div>
                    {this._getErrors()}
                </div>
                {this._formatRooms()}
            </div>
        );
    }
}

export default ChatInput;
