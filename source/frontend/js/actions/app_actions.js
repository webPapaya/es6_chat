"use strict";

import AppDispatcher from '../dispatcher/app_dispatcher'
import Ajax          from 'simple-ajax'

var AppActions = {
    changeUserName: function(name) {
        AppDispatcher.dispatch({
            actionType: 'changeName',
            payload:    {
                name: name
            }
        });
    },

    handleMessage: function(roomId, message) {
        AppDispatcher.dispatch({
            actionType: 'handleMessage',
            payload:    {
                date:    new Date(),
                message: message,
                roomId:  roomId
            }
        });
    },

    addChatRoom: function(name) {
        AppDispatcher.dispatch({
            actionType: 'addChatRoom',
            payload:    {
                date:  new Date(),
                name:  name
            }
        });
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

export default AppActions;