"use strict";

import BaseStore        from './base_store'
import AppDispatcher    from '../dispatcher/app_dispatcher'
import assign           from 'object-assign'
import offlineStorage   from 'store'
import { EventEmitter } from 'events'

var ChatStore = assign({}, BaseStore, {
    // Get all messages to a given room
    getMessages(roomId) {
        let messages = offlineStorage.get('messages');
        if (messages) {
            return messages[roomId] || [];
        }
        return [];
    }
});


AppDispatcher.register(function(action) {
    switch(action.actionType) {
        // Handle an incoming message
        case 'handleMessage':
            let messages = offlineStorage.get('messages') || {};
            let {roomId, date, message, username} = action.payload;
            if(!messages[roomId]){messages[roomId] = []}
            messages[roomId].push({date, message, username});
            offlineStorage.set('messages', messages)
            ChatStore.emitChange();
            break;
    }
});

export default ChatStore;