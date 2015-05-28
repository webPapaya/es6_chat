"use strict";

import AppDispatcher    from '../dispatcher/app_dispatcher'
import assign           from 'object-assign'
import { EventEmitter } from 'events'

let messages = [];

var AppStore = assign({}, EventEmitter.prototype, {
    getMessages() {
      return messages;
    },

    addChangeListener(callback) {
        this.on('change', callback);
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
        default:
    }
});

export default AppStore;