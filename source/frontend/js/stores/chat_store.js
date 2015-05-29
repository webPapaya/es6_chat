"use strict";

import AppDispatcher    from '../dispatcher/app_dispatcher'
import assign           from 'object-assign'
import { EventEmitter } from 'events'

let messages = [];
let rooms    = [];

var AppStore = assign({}, EventEmitter.prototype, {
    getMessages() {
      return messages;
    },

    getRooms() {
        return rooms;
    },

    addChangeListener(callback) {
        this.on('change', callback);
    },

    removeChangeListener() {
        this.removeAllListeners('change');
    },

    emitChange() {
        this.emit('change');
    }
});

AppDispatcher.register(function(action) {
    switch(action.actionType) {
        case 'handleMessage':
            messages.push(action.payload);
            AppStore.emitChange();
            break;
        case 'addChatRoom':
            rooms.push(action.payload);
            AppStore.emitChange();

        default:
    }
});

export default AppStore;