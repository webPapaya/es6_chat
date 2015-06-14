/**
 * socket_actions.js
 *
 * These are the actions which are related to the websockets
 */

import globalConfig  from '../../../backend/js/config/config'
import AppDispatcher from '../dispatcher/app_dispatcher'
import IO            from 'socket.io-client'
import AppActions    from './app_actions'

let socket = IO(`http://localhost:${globalConfig.websocketPort}`);

// Callback when the Client is connected to the server
socket.on('connection', function() {
    // fetch initialize data from the server
    socket.emit('getAllRooms');

    // Action when the server provides all
    // available rooms
    socket.on('getAllRooms', function(rooms){
        AppDispatcher.dispatch({
            actionType: 'initializeRooms',
            payload:    {
                date:  new Date(),
                rooms: rooms
            }
        });
    });

    // Action when a chat room was added on the server
    socket.on('addedChatRoom', function(roomName) {
        AppDispatcher.dispatch({
            actionType: 'addChatRoom',
            payload:    {
                date:  new Date(),
                name:  roomName
            }
        });
    });

    // Main Action when the creation of a chatroom failed
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

    // Main action when a new message is received
    socket.on('newMessage', function(payload) {
        AppDispatcher.dispatch({
            actionType: 'handleMessage',
            payload:    {
                date:     new Date(),
                message:  payload.message,
                roomId:   payload.roomId,
                username: payload.username
            }
        });
    });
});

let SocketActions = {
    addChatRoom: function(roomName) {
        socket.emit('addChatRoom', roomName);
    },

    handleMessage: function(roomId, message, username) {
        socket.emit('addMessage', roomId, message, username);
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