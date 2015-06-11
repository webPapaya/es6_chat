"use strict";

import Ajax          from 'simple-ajax'
import {}            from './socket_actions'
import AppDispatcher from '../dispatcher/app_dispatcher'
import Validations   from '../validations/validations'

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
        if(Validations.isRoomNameUnique(name)) {
            AppDispatcher.dispatch({
                actionType: 'addChatRoom',
                payload:    {
                    date:  new Date(),
                    name:  name
                }
            });
        } else {
            AppDispatcher.dispatch({
                actionType: 'error',
                payload: {
                    date:    new Date(),
                    type:    'validation',
                    action:  'addChatRoom',
                    message: name + ' is not a unique room name'
                }
            });
        }
    },

    changeRoom: function(roomId) {
        AppDispatcher.dispatch({
            actionType: 'changeRoom',
            payload:    {
                date:  new Date(),
                roomId:  roomId
            }
        });
    },

    error: function(type, store, message = "An Error occured") {
        AppDispatcher.dispatch({
            actionType: 'error',
            payload:    {
                date:    new Date(),
                type:    type,
                store:   store,
                message: message
            }
        });
    }
};

export default AppActions;