"use strict";

import AppDispatcher from '../dispatcher/app_dispatcher'
import Ajax          from 'simple-ajax'

var AppActions = {
    create: function(counts) {
        AppDispatcher.dispatch({
            actionType: 'create',
            text: counts
        });
    },
    loadJSON: function() {
        var request = new Ajax('http://jsonplaceholder.typicode.com/posts');
        request.on('success', function(event) {
            var response = JSON.parse(event.target.response);
            AppDispatcher.dispatch({
                actionType: 'loadedPosts',
                text: response
            });
        });
        request.send();
    }
};

export default AppActions;