"use strict";

import globalConfig  from '../../../backend/js/config/config'
import AppDispatcher from '../dispatcher/app_dispatcher'
import IO            from 'socket.io-client'


let socket = IO(`http://localhost:${globalConfig.websocketPort}`);

socket.on('connection', function() {
   console.log('test');
});

socket.on('ping', function(data) {
    console.log(data);
});

export default {};