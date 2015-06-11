import mongoose from 'mongoose';
let { Schema } = mongoose;
import Promise from 'promise'
import User from './user'


let RoomSchema = new Schema({
    name: { type: String, index: { unique: true }, default: `Room-${Date.now()}` },
    default: { type: Boolean, default: false }
})

let RoomModel = mongoose.model('Room', RoomSchema)

class Room {
    constructor(dbRecord) {
        this._record = dbRecord

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

    json() {
        return {
            id: this.id,
            name: this.name
        };
    }


    save(cb) {
        this._record.save(function (err) {
            cb(err)
        })
    }

    users(cb) {
        User.findByRoom(this)
            .then(function(users) {
                cb(users);
            });
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

    static all(cb) {
        RoomModel.find(function(err, rooms) {
            rooms = rooms.map(function(rec) {
                return new Room(rec)
            })

            cb(rooms, err)
        });
    }

    static allJson(cb) {
        this.all(function(rooms) {
            let jsonRooms = rooms.map(function(room) {
                return room.json()
            })

            cb(jsonRooms)
        });
    }

    static find(id) {
        return new Promise(function(resolve, reject) {
            RoomModel.findById(id, function(err, roomRecord) {
                if(!err) {
                    let room = new Room(roomRecord);
                    resolve(room);
                } else {
                    reject(err)
                }
            })
        })
    }

    static default(cb) {
        RoomModel.findOne({ default: true }, function(err, room) {
            cb(room, err)
        })
    }
}

export default Room;