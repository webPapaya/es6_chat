"use strict";

import AppDispatcher from '../dispatcher/app_dispatcher'
import Ajax          from 'simple-ajax'

var AppActions = {
    handleMessage: function(message) {
        AppDispatcher.dispatch({
            actionType: 'handleMessage',
            payload:    {
                date:    new Date(),
                message: message
            }
        });
    }
};

export default AppActions;