import assign           from 'object-assign'
import offlineStorage   from 'store'
import { EventEmitter } from 'events'
import _                from 'lodash'


import BaseStore        from './base_store'
import AppDispatcher    from '../dispatcher/app_dispatcher'
import AppActions       from '../actions/app_actions'



let RoomStore = assign({}, BaseStore, {
    getCurrentRoom() {
        let currentRoomId = offlineStorage.get('currentRoom');
        let rooms = offlineStorage.get('rooms');
        return _.find(rooms, {id: currentRoomId});
    },


    getRooms() {
        return offlineStorage.get('rooms') || [];
    },

    setCurrentRoom(roomId) {
        offlineStorage.set('currentRoom', roomId);
    }
});

AppDispatcher.register(function(action) {
    switch(action.actionType) {
        case 'initializeRooms':
            offlineStorage.set('rooms', action.payload.rooms);
            RoomStore.emitChange();
            break;

        case 'changeRoom':
            RoomStore.setCurrentRoom(action.payload.roomId);
            RoomStore.emitChange();
            break;

        case 'addChatRoom':
            let rooms = offlineStorage.get('rooms') || [];
            action.payload.id = rooms.length;
            rooms.push(action.payload);
            offlineStorage.set('rooms', rooms);
            RoomStore.emitChange();
            break;

        case 'error':
            RoomStore.emitError(action.payload);
            break;
    }
});


export default RoomStore;