import mongoose from 'mongoose'
let { Schema } = mongoose
import Promise from 'promise'
import User from './user'
import socket from 'socket.io'
import io from './io'

let RoomSchema = new Schema({
    name: { type: String, index: { unique: true }, default: `Room-${Date.now()}` },
    default: { type: Boolean, default: false }
})

let RoomModel = mongoose.model('Room', RoomSchema)

class Room {
    constructor(dbRecord) {
        this._record =  dbRecord;
        this._users =   [];
    }

    get id() {
        return this._record.id;
    }

    get name() {
        return this._record.name;
    }

    get slug() {
        return this.name.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');
    }

    json() {
        return {
            id:   this.id,
            slug:   this.slug,
            name:   this.name
        };
    }

    users() {
        return this._users;
    }

    connect(socket) {
        let id = socket.id;
        let user = User.new(id, this);

        socket.join(this.slug);
        this.enter(user);

        socket.on('disconnect', function() {
            this.leave(user);
        });

        socket.on('message', function(msg) {
            this.message(msg, socket)
        });
    }

    enter(user) {
        this.message(`# User ${user.name} joined this room.`);
        return this._users.push(user);
    }

    leave(user) {
        this.message(`# User ${user.name} left this room.`);
        let idx = this._users.indexOf(user);
        if(idx > -1) {
            return this._users.splice(idx, 1);
        }
    }

    message(msg, socket) {
        let senderName = socket ? this.userForSocket(socket) : "System";
        io.sockets.in(this.slug).emit('message', `${senderName}: ${msg}`)
    }

    static create(name, isDefault) {
        let record = new RoomModel({name: name, default: isDefault})

        return new Promise(function(resolve, reject) {
            record.save(function(err) {
                if(!err) {
                    return resolve(new Room(record));
                } else {
                    return reject(err);
                }
            });
        });
    }

    static all() {
        return new Promise(function(resolve, reject) {
            RoomModel.find(function(err, rooms) {
                rooms = rooms.map(function(rec) {
                    return new Room(rec)
                });

                if(!err) {
                    return resolve(rooms);
                } else {
                    return reject(err);
                }
            });
        })
    }

    static allJson() {
        return new Promise(function(resolve, reject) {
            Room.all()
                .then(function(rooms) {
                    let jsonRooms = rooms.map(function(room) {
                        return room.json()
                    })
                    console.log(jsonRooms)

                    resolve(jsonRooms);
                })
                .catch(function(err) {
                    reject(err);
                });
        })
    }
}

export default Room;