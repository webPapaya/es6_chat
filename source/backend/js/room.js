import mongoose from 'mongoose';
let { Schema } = mongoose;
import Promise from 'promise'
import User from './user'
import io from 'socket.io';


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

    get name() {
        return this._record.name;
    }

    get id() {
        return this._record.id;
    }

    get default() {
        return this._record.default;
    }

    get slug() {
        return `/${this.name.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'')}`;

    }

    json() {
        return {
            id:     this.id,
            slug:   this.slug,
            name:   this.name
        };
    }

    users() {
        return this._users;
    }

    listen(port) {
        this.chat = io(port)
            .of(this.slug)
            .on('connection', this.handleConnection)
    }

    handleConnection(socket) {
        let id = socket.id,
            user = User.new(id, this);

        this.enter(user);

        socket.on('disconnect', function() {
            this.leave(user);
        })

        socket.on('message', function(msg) {
            this.message(msg, socket)
        })
    }

    enter(user) {
        this.emit(`# User ${user.name} connected.`);
        return this._users.push(user);
    }

    leave(user) {
        this.emit(`# User ${user.name} disconnected.`);
        let idx = this._users.indexOf(user);
        if(idx > -1) {
            return this._users.splice(idx, 1);
        }
    }

    emit(msg) {
        if(this.chat) {
            return this.chat.emit(msg);
        } else {
            return false;
        }
    }

    message(msg, socket) {
        let sender = this.userForSocket(socket);
        this.chat.emit(`${sender.name}: ${msg}`);
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

                    resolve(jsonRooms);
                })
                .catch(function(err) {
                    reject(err);
                });
        })
    }
}

export default Room;