"use strict";

import globalConfig  from '../../../backend/js/config/config'
import AppDispatcher from '../dispatcher/app_dispatcher'
import IO            from 'socket.io-client'
import AppActions    from './app_actions'


let socket = IO(`http://localhost:${globalConfig.websocketPort}`);

socket.on('connection', function() {
    // Initialize data from the server
    socket.emit('getAllRooms');
    socket.emit('getUsers');

    socket.on('getAllRooms', function(rooms){
        AppDispatcher.dispatch({
            actionType: 'initializeRooms',
            payload:    {
                date:  new Date(),
                rooms: rooms
            }
        });
    });

    socket.on('addedChatRoom', function(roomName) {
        AppDispatcher.dispatch({
            actionType: 'addChatRoom',
            payload:    {
                date:  new Date(),
                name:  roomName
            }
        });
    });

    socket.on('addChatRoomFailed', function(error) {
        AppDispatcher.dispatch({
            actionType: 'error',
            payload: {
                date:    new Date(),
                type:    'validation',
                action:  'addChatRoom',
                message: error
            }
        });
    });

    socket.on('newMessage', function(payload) {
        AppDispatcher.dispatch({
            actionType: 'handleMessage',
            payload:    {
                date:    new Date(),
                message: payload.message,
                roomId:  payload.roomId
            }
        });
    });
});

let SocketActions = {
    addChatRoom: function(roomName) {
        socket.emit('addChatRoom', roomName);
    },

    handleMessage: function(roomId, message) {
        socket.emit('addMessage', roomId, message);
    },

    changeRoom: function(roomId) {
        AppDispatcher.dispatch({
            actionType: 'changeRoom',
            payload:    {
                date:  new Date(),
                roomId:  roomId
            }
        });
    }
};

export default SocketActions;