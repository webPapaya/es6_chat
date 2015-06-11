import express from 'express';
import mongoose from 'mongoose';
import socket from 'socket.io'

import { db } from './config/config'

import Room from './room';
import User from './user';
import Controller from './controller';

let app = express();
let io = socket.listen(1337);
let appController = new Controller();

mongoose.connect(db.development);

app.get('/',                appController.roomsIndex);
app.get('/rooms',           appController.roomsIndex);
app.get('/rooms/:id/users', appController.roomUsers);
app.get('/users',           appController.usersIndex);

io.on("connection", function(socket){
    console.log(socket)
});

let server = app.listen(3030, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Chat application listening at http://%s:%s', host, port);
});