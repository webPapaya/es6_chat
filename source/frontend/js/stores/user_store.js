"use strict";

import BaseStore        from './base_store'
import AppDispatcher    from '../dispatcher/app_dispatcher'
import assign           from 'object-assign'
import offlineStorage   from 'store'
import { EventEmitter } from 'events'

var UserStore = assign({}, BaseStore, {
    // Returns the current Username from local storage
    // if the username is not defined it returns an empty string
    getUserName() {
        return offlineStorage.get('username') || '';
    }
});

AppDispatcher.register(function(action) {
    switch(action.actionType) {
        case 'changeName':
            offlineStorage.set('username', action.payload.name);
            UserStore.emitChange();
            break;
    }
});

export default UserStore;