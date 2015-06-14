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
});


let SocketActions = {
    addChatRoom: function(roomName) {
        socket.emit('addChatRoom', roomName);
    }
};





export default SocketActions;