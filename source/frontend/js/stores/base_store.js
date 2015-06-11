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
    },

    addErrorListener(callback) {
        this.on('error', callback);
    },

    removeErrorListener() {
        this.removeAllListeners('error');
    },

    emitError(payload) {
        this.emit('error', payload)
    }
});


export default BaseStore;