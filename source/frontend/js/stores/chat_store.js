"use strict";

import BaseStore        from './base_store'
import AppDispatcher    from '../dispatcher/app_dispatcher'
import assign           from 'object-assign'
import offlineStorage   from 'store'
import { EventEmitter } from 'events'

var AppStore = assign({}, BaseStore, {
    getMessages(roomId) {
        let messages = offlineStorage.get('messages');
        if (messages) {
            return messages[roomId] || [];
        }
        return [];
    },

    getUserName() {
      return offlineStorage.get('username') || '';
    }
});


AppDispatcher.register(function(action) {
    switch(action.actionType) {
        case 'handleMessage':
            let messages = offlineStorage.get('messages') || {};
            let {roomId, date, message} = action.payload;

            if(!messages[roomId]){messages[roomId] = []}
            messages[roomId].push({date, message});
            offlineStorage.set('messages', messages)

            AppStore.emitChange();
            break;

        case 'changeName':
            offlineStorage.set('username', action.payload.name);
            AppStore.emitChange();
            break;
    }
});

export default AppStore;