"use strict";

import AppDispatcher from '../dispatcher/app_dispatcher'
import IO            from 'socket.io-client'


let socket = IO('http://localhost:1337');

socket.on('connection', function() {
   console.log('test');
});

socket.on('ping', function(data) {
    console.log(data);
});

export default {};