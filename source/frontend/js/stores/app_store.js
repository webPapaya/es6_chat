"use strict";

import AppDispatcher    from '../dispatcher/app_dispatcher'
import assign           from 'object-assign'
import { EventEmitter } from  'events'

var chatMessages = 0;
var posts = {};

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
        case 'loadedPosts':
            posts = action.text;
        default:
        // no op
    }
});

export default AppStore;