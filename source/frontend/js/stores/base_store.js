"use strict";

import assign           from 'object-assign'
import { EventEmitter } from 'events'

let BaseStore = assign({}, EventEmitter.prototype, {
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


export default BaseStore;