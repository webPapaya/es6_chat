import express from 'express';
import mongoose from 'mongoose';
import socket from 'socket.io'

import { db } from './config/config'

import Room from './room';
import User from './user';
import Controller from './controller';

let app = express(),
    io = socket(1337);

mongoose.connect(db.development);

Room.all().then(function(rooms) {
    let appController = new Controller(rooms);

    app.get('/',                appController.roomsIndex);
    app.get('/rooms',           appController.roomsIndex);
    app.get('/rooms/:id/users', appController.roomUsers);
    app.get('/users',           appController.usersIndex);

    io.on("connection",         appController.idleSocket);

    let server = app.listen(4000, function () {
        var host = server.address().address;
        var port = server.address().port;

        console.log('Chat application listening at http://%s:%s', host, port);
    });
});