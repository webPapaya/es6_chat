"use strict";

import AppDispatcher from '../dispatcher/app_dispatcher'

var AppActions = {
    create: function(counts) {
        AppDispatcher.dispatch({
            actionType: 'create',
            text: counts
        });
    }
};

export default AppActions;