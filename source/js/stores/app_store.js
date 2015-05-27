"use strict";

import AppDispatcher from '../dispatcher/app_dispatcher'
import assign        from 'object-assign'
var EventEmitter = require('events').EventEmitter

var chatMessages = 0;

var AppStore = assign({}, EventEmitter.prototype, {
    getChatMessages: function() {
        return chatMessages;
    }
});

AppDispatcher.register(function(action) {
    switch(action.actionType) {
        case 'create':
            chatMessages = action.text;
            break;

        default:
        // no op
    }
});

export default AppStore;