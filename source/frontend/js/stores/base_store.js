/**
 * This is a Base store which can be used as a
 * mixin from other stores.
 */

import assign           from 'object-assign'
import { EventEmitter } from 'events'

let BaseStore = assign({}, EventEmitter.prototype, {
    // Register a callback method which is called
    // when a store changes
    addChangeListener(callback) {
        this.on('change', callback);
    },

    // Removes all change listener
    removeChangeListener() {
        this.removeAllListeners('change');
    },

    // Emits a change
    emitChange() {
        this.emit('change');
    },

    // Add an error listener
    addErrorListener(callback) {
        this.on('error', callback);
    },

    // Remove all error listeners
    removeErrorListener() {
        this.removeAllListeners('error');
    },

    // Emit an error
    emitError(payload) {
        this.emit('error', payload)
    }
});


export default BaseStore;